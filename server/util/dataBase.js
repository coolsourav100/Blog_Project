const mysql = require("mysql")
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'sourav1234#',
    database:'blog'
})
module.exports = db