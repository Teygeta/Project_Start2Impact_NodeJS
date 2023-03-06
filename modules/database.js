module.exports = executeQuery

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
})

function executeQuery(sql, callback) {
    connection.query(sql, callback);
}
