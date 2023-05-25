const mysql = require("mysql2");
const db = require('./config/connection')
const inquirer = require("inquirer");
const {initQs,addDeptQs,addRoleQs,addEmployeeQs,updateEmployeeQs,} = require("./questions");
const {viewDepartment, viewRoles, viewEmployees, viewManagers, listDepartments} = require("./db_promises.js");
require("dotenv").config;
require("console.table");

db.connect(function (err) {
  if (err) throw err;
  console.log("DB connected");
  startInquirer();
});

function startInquirer() {
  return inquirer.prompt(initQs).then( async (answers) => {
    switch (answers.options) {
      case "view all departments":
          viewDepartment()
            .then((res) => {
                console.log("\n");
                console.table(res[0]);
                startInquirer();
            })
            .catch((err) => console.log(err))
        break;
      case "view all roles":
        viewRoles()
        .then((res)=> {
            console.log("\n");
            console.table(res[0]);
          startInquirer();
        })
        .catch((err) => console.log(err))
        break;
      case "view all employees":
        viewEmployees()
        .then((res)=> {
            console.log("\n");
            console.table(res[0]);
          startInquirer();
        })
        .catch((err) => console.log(err))
        break;
      case "add a department":
        inquirer
          .prompt(addDeptQs)
          .then((answers) => {
            const { deptname } = answers;
            const sql4 = `INSERT INTO department (name) VALUES ("${deptname}")`;
            db.query(sql4, (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(`Added ${deptname} to the database`);
              startInquirer();
            });
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "add a role":
          const departments = await listDepartments()
          inquirer
            .prompt(departments)
            .then((answers) => {
              const { title, salary, deptname } = answers;
              console.log(answers)
              const sql6 = `SELECT id FROM department WHERE name = "${deptname}"`;
              db.query(sql6, (err, results1) => {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log(results1)
                const sql7 = `INSERT INTO role (title, salary, department_id) VALUES ("${title}",${salary},${results1[0].id})`;
                db.query(sql7, (err, results) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  console.log(`Added ${title} to the database`);
                  startInquirer();
                });
              });
            })
            .catch((err) => {
                console.log(err);
        /* }); */
    })
        break;
      case "add an employee":
        const roles = await viewRoles()
        const mapRoles = roles[0].map((obj) => obj.title)
        const employees = await viewManagers()
        const mapEmployees = employees[0].map((obj) => obj.first_name)
        inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "What is the employees first name?",
              },
              {
                type: "input",
                name: "last_name",
                message: "What is the employees last name?",
              },
              {
                type: "list",
                name: "role",
                message: "What is the employees role?",
                choices: mapRoles
              },
              {
                type: "list",
                name: "manager",
                message: "What is the employees manager?",
                choices: []
              },
            ])
            .then((answers) => console.log(answers))
            .catch((err) => console.log(err))
        break;
      case "update an employee role":
        console.log("function works7");
        break;
    }
  });
}
