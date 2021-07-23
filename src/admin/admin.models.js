const database = require('../database/mysql')

exports.getAdminUserByUsername = async (username) => {
    const sqlString = "select * from admin where username = ?"
    try {
        const data = await database.query(sqlString, [username])
        return data
    } catch (error) {
        console.log('loi' + error.message)
        throw error
    }
}


exports.existsAdminUser = async (username) => {
    try {
        const data = await this.getAdminUserByUsername(username)
        if (data.length == 0)
            return false
        return true
    } catch (error) {
        return null
    }
}

exports.createAdminUser = async (data) => {
    const sqlString = 'insert into admin values(?,?)'
    try {
        const result = await database.query(sqlString, [data.username, data.hashPassword])
        if (result.affectedRows != 0)
            return true
        return false
    } catch (error) {

    }
}