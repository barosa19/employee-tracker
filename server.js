require('dotenv').config
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_UN,
    password: process.env.DB_PW,
    database: process.env.DB
})