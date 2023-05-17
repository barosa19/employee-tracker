const mysql = require("mysql2");
const inquirer = require("inquirer");
const questions = require("./questions.json");
const sortOptions = require("./helper");
require("dotenv").config;

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
        .prompt(questions)
        .then((answers) => {
            sortOptions(answers.options, db);
        })
        .catch((err) => {
          console.log(err);
        });
}
