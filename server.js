const db = require("./config/connection");
const inquirer = require("inquirer");
const {
  initQs,
  addDeptQs,
  viewDepartment,
  viewRoles,
  viewEmployees,
  listDepartments,
  addEmployeePrompt,
  updateEmployeePrompt,
} = require("./inquirerPrompt.js");

require("dotenv").config;
require("console.table");

db.connect(function (err) {
  if (err) throw err;
  console.log("DB connected");
  startInquirer();
});

function startInquirer() {
  return inquirer.prompt(initQs).then(async (answers) => {
    switch (answers.options) {
      case "view all departments":
        viewDepartment()
          .then((res) => {
            console.log("\n");
            console.table(res[0]);
            startInquirer();
          })
          .catch((err) => console.log(err));
        break;
      case "view all roles":
        viewRoles()
          .then((res) => {
            console.log("\n");
            console.table(res[0]);
            startInquirer();
          })
          .catch((err) => console.log(err));
        break;
      case "view all employees":
        viewEmployees()
          .then((res) => {
            console.log("\n");
            console.table(res[0]);
            startInquirer();
          })
          .catch((err) => console.log(err));
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
        const departments = await listDepartments();
        inquirer.prompt(departments).then(async (answers) => {
          const { title, salary, deptname } = answers;

          const sqlA = `SELECT id FROM department WHERE name = "${deptname}"`;
          const deptIDarray = await db.promise().query(sqlA);
          const deptID = deptIDarray[0];

          const sqlB = `INSERT INTO role (title, salary, department_id) VALUES ("${title}",${salary},${deptID[0].id})`;
          db.query(sqlB, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(`Added ${title} to the database`);
            startInquirer();
          });
        });
        break;
      case "add an employee":
        const employeePrompt = await addEmployeePrompt();
        inquirer
          .prompt(employeePrompt)
          .then(async (answers) => {
            const { first_name, last_name, role, manager } = answers;

            const roleSQL = `SELECT id FROM role WHERE title = "${role}"`;
            const roleArray = await db.promise().query(roleSQL);
            const roleId = roleArray[0];

            const managerSQL = `SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = "${manager}"`;
            const managerArray = await db.promise().query(managerSQL);
            const managerID = managerArray[0];

            const insertSQL = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}","${last_name}",${roleId[0].id},${managerID[0].id})`;
            db.query(insertSQL, (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(`Added ${first_name} ${last_name} to the database`);
              startInquirer();
            });
          })
          .catch((err) => console.log(err));
        break;
      case "update an employee role":
        const updatePrompt = await updateEmployeePrompt();
        inquirer
          .prompt(updatePrompt)
          .then(async (answers) => {
            const { employee, role } = answers;
            const roleSQL = `SELECT id FROM role WHERE title = "${role}"`;
            const roleArray = await db.promise().query(roleSQL);
            const roleId = roleArray[0];
            const updateSQL = `UPDATE employee SET role_id = ${roleId[0].id} WHERE CONCAT(first_name, " ", last_name) = "${employee}"`;
            db.query(updateSQL, (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(`Updated employee's role`);
              startInquirer();
            });
          })
          .catch((err) => console.log(err));
        break;
    }
  });
}
