const mysql = require("mysql2");
const db = require('./config/connection')

function viewDepartment() {
  const sql = `SELECT * FROM department`;
  return db.promise().query(sql);
}

function viewRoles() {
  const sql = `SELECT role.id, title, name AS department, salary 
               FROM role 
               LEFT JOIN department ON role.department_id = department.id`;
  return db.promise().query(sql);
}

function viewEmployees() {
  const sql = `SELECT t1.id, t1.first_name, t1.last_name, title, name AS department, salary, CONCAT(t2.first_name, " ", t2.last_name) AS manager 
               FROM employee AS t1 
               LEFT JOIN role ON t1.role_id = role.id 
               LEFT JOIN department ON role.department_id = department.id 
               LEFT JOIN employee AS t2 ON t1.manager_id = t2.id `;
  return db.promise().query(sql);
}

function viewManagers() {
  const sql = `SELECT CONCAT(first_name, " ", last_name) FROM employee `;
  return db.promise().query(sql);
}

async function listDepartments() {
  const departmentObj =  await viewDepartment()
  console.log(departmentObj)
  const departmentName = departmentObj[0].map((obj) => obj.name);
  return [
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
      choices: departmentName,
    },
  ];
}

module.exports = {
  viewDepartment,
  viewRoles,
  viewEmployees,
  viewManagers,
  listDepartments,
};
