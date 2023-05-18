const mysql = require("mysql2");
const inquirer = require("inquirer");
const {
  initQs,
  addDeptQs,
  addRoleQs,
  addEmployeeQs,
  updateEmployeeQs,
} = require("./questions.js");
//const sortOptions = require("./helper");
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
  return inquirer
    .prompt(initQs)
    .then((answers) => {
      switch (answers.options) {
        case "view all departments":
          const sql1 = `SELECT * FROM department`;
          db.query(sql1, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("\n");
            console.table(results);
            startInquirer();
          });
          break;
        case "view all roles":
          const sql2 = `SELECT role.id, title, name AS department, salary FROM role LEFT JOIN department ON role.department_id = department.id`;
          db.query(sql2, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("\n");
            console.table(results);
            startInquirer();
          });
          break;
        case "view all employees":
          const sql3 = `SELECT t1.id, t1.first_name, t1.last_name, title, name AS department, salary, t2.first_name AS manager FROM employee AS t1 LEFT JOIN role ON t1.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS t2 ON t1.manager_id = t2.id `;
          db.query(sql3, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("\n");
            console.table(results);
            startInquirer();
          });
          break;
        case "add a department":
          inquirer
            .prompt(addDeptQs)
            .then((answers) => {
              const { deptname } = answers;
              const sql4 = `INSERT INTO department (name) VALUES ("${deptname}")`
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
          console.log("function works5");
          break;
        case "add an employee":
          console.log("function works6");
          break;
        case "update an employee role":
          console.log("function works7");
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
