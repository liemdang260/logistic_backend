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

module.exports.getWarehouseByProvince = async(tinh)=>{
    const sqlString = `select * from kho where tinh like ?`

    try {
        const data = await database.query(sqlString,['%'+tinh+'%'])
        return data
    } catch (error) {
        console.log(error.message)
        return null
    }
}


module.exports.deleteWarehouseById = async (id)=>{
    const sqlString = 'delete from kho where makho = ?'
    try {
        const result = await database.query(sqlString,[id])
        console.log(result)
        return result.affectedRows
    } catch (error) {
        console.log(error.message)
        return null
    }
}