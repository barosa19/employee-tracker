require("dotenv").config;
const mysql = require("mysql2");
const inquirer = require("inquirer");
const questions = require("./questions.json");
const sortOptions = require("./helper");

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_UN,
  password: process.env.DB_PW,
  database: process.env.DB,
});

inquirer
  .prompt(questions)
  .then((answers) => {
    sortOptions(answers);
  })
  .catch((err) => {
    console.log(err);
  });
