const mysql = require("mysql2");
const inquirer = require("inquirer");
const {
  initQs,
  addDeptQs,
  addRoleQs,
  addEmployeeQs,
  updateEmployeeQs,
} = require("./db_promises");
const {viewDepartment, viewRoles, viewEmployees} = require("./db_promises.js");
require("dotenv").config;
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Barosa97!",
  database: "employee_db",
  port: 3306,
});
db.connect(function (err) {
  if (err) throw err;
  console.log("DB connected");
  startInquirer();
});

function startInquirer() {
  return inquirer.prompt(initQs).then((answers) => {
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
        // grabs an array of departments
        const sql5 = `SELECT * FROM department`;
        db.query(sql5, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          const departments = results.map((obj) => {
            return obj.name;
          });
          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "What is the name of the role?",
              },
              {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
              },
              {
                type: "list",
                name: "deptname",
                message: "Which department does the role belong to?",
                choices: departments,
              },
            ])
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
        });
    })
        break;
      case "add an employee":
        
        break;
      case "update an employee role":
        console.log("function works7");
        break;
    }
  });
}
