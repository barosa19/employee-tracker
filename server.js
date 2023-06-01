const db = require("./config/connection");
const inquirer = require("inquirer");
const {
  viewDepartment,
  viewRoles,
  viewEmployees,
  viewManagers,
  initQs,
  addDeptQs,
  addRoleQs,
  addEmployeeQs,
  updateEmployeeQs
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
            const insertSQL = `INSERT INTO department (name) VALUES ("${deptname}")`;
            db.query(insertSQL, (err, results) => {
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
        const addRoleQsArray = await addRoleQs();
        inquirer.prompt(addRoleQsArray).then(async (answers) => {
          const { title, salary, deptname } = answers;
          //selects the id for the department the user selected
          const selectSQL = `SELECT id FROM department WHERE name = "${deptname}"`;
          const deptIDarray = await db.promise().query(selectSQL);
          const deptID = deptIDarray[0];
          //adds a role to employee_db
          const insertSQL = `INSERT INTO role (title, salary, department_id) VALUES ("${title}",${salary},${deptID[0].id})`;
          db.query(insertSQL, (err, results) => {
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
        const employeePrompt = await addEmployeeQs();
        inquirer
          .prompt(employeePrompt)
          .then(async (answers) => {
            const { first_name, last_name, role, manager } = answers;
            //selects the id for the role the user selected
            const roleSQL = `SELECT id FROM role WHERE title = "${role}"`;
            const roleArray = await db.promise().query(roleSQL);
            const roleId = roleArray[0];
            //selects the id for the manager the user selected
            const managerSQL = `SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = "${manager}"`;
            const managerArray = await db.promise().query(managerSQL);
            const managerID = managerArray[0];
            //adds an employee to employee_db
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
        const updatePrompt = await updateEmployeeQs();
        inquirer
          .prompt(updatePrompt)
          .then(async (answers) => {
            const { employee, role } = answers;
            //selects the id for the role the user selected
            const roleSQL = `SELECT id FROM role WHERE title = "${role}"`;
            const roleArray = await db.promise().query(roleSQL);
            const roleId = roleArray[0];
            //updates employee role in employee_db
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
