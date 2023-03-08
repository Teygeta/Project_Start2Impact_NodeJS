const mysql = require('mysql')
const dotenv = require('dotenv');

dotenv.config() //TODO ricommittare .env nel progetto

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

function executeQuery(sql, callback) {
  connection.query(sql, callback);
}

module.exports = executeQuery
