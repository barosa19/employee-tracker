const db = require("./config/connection");

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
  const sql = `SELECT CONCAT(first_name, " ", last_name) AS managers FROM employee `;
  return db.promise().query(sql);
}

const initQs = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
    ],
  },
];

const addDeptQs = [
  {
    type: "input",
    name: "deptname",
    message: "What is the name of the department?",
  },
];

async function addRoleQs() {
  try {
    const departmentObj = await viewDepartment();
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
  } catch {
    (err) => console.log(err);
  }
}

async function addEmployeeQs() {
 
  const roles = await viewRoles()
  const rolesArray = roles[0].map((obj) => obj.title)
  
  const employees = await viewManagers()
  const employeesArray = employees[0].map((obj) => obj.managers)

  return [
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
      choices: rolesArray
    },
    {
      type: "list",
      name: "manager",
      message: "What is the employees manager?",
      choices: employeesArray
    },
  ]
}

async function updateEmployeeQs() {

  const employeeSQL = `SELECT CONCAT(first_name, " ", last_name) AS employee FROM employee `;
  const employees = await db.promise().query(employeeSQL)
  const employeesArray = employees[0].map((obj) => obj.employee)

  const roles = await viewRoles()
  const rolesArray = roles[0].map((obj) => obj.title)
  return [
    {
      type: "list",
      name: "employee",
      message: "Which employee's role do you want to update?",
      choices: employeesArray
    },
    {
      type: "list",
      name: "role",
      message: "Which role do you want to assign the selected employee?",
      choices: rolesArray
    },
  ]
}

module.exports = {
  viewDepartment,
  viewRoles,
  viewEmployees,
  viewManagers,
  initQs,
  addDeptQs,
  addRoleQs,
  addEmployeeQs,
  updateEmployeeQs
};
