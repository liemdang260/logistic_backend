const mysql = require('mysql2/promise')

const pool = mysql.createPool({

    // host: 'db4free.net',
    // port: 3306,
    // user: 'liemdang',
    // password: 'liemdang',
    // database: 'logistic',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'logistic',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


module.exports.query = async (sqlString, params = []) => {
    const data = await pool.query(sqlString,params)
    return data[0]
}



