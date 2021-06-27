const database = require('../database/mysql')

module.exports.getAll = async () => {
    const sqlString ='select * from kho'
    try {
        const data = await database.query(sqlString)
        return data
    } catch (error) {
        console.log(`loi khi lay toan bo kho: ${error.message}`)
        return null
    }
}