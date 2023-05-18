const initQs =[
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
            "update an employee role"
        ]
    }
]

const addDeptQs = [
    {
      type: "input",
      name: "deptname",
      message: "What is the name of the department?"
    }
]

const addRoleQs = [
    {
      type: "input",
      name: "deptname",
      message: "What is the name of the department?"
    }
]

const addEmployeeQs = [
    {
      type: "input",
      name: "deptname",
      message: "What is the name of the department?"
    }
]

const updateEmployeeQs = [
    {
      type: "input",
      name: "deptname",
      message: "What is the name of the department?"
    }
]

module.exports = {initQs, addDeptQs, addRoleQs, addEmployeeQs, updateEmployeeQs}