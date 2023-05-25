const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Barosa97!",
  database: "employee_db",
  port: 3306,
});

module.exports = db;
