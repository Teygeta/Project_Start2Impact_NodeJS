/*const { createPool } = require('mysql')
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: ''
})

pool.query(`select * from pof_purchasing.orders`, (err, res) => {
    return console.log(res);
})*/

module.exports = executeQuery

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
})

function executeQuery(sql, callback) {
    connection.connect();
    connection.query(sql, callback);
    connection.end();
}
