const database = require('../database//mysql')

exports.getUser = async (userName) => {
    const sqlString = 'SELECT * from user where tendangnhap = ?'
    try {
        return await database.query(sqlString, [userName])
    } catch (error) {
        return null;
    }
}

exports.createUser = async (user) => {
    let insert_client_id
    const sqlString_createClient = 'INSERT INTO KHACHHANG VALUES()'
    try {
        const data = await database.query(sqlString_createClient)
        insert_client_id = data.insertId
    } catch (error) {
        return null
    }

    if (!insert_client_id) return false

    const sqlString = 'INSERT INTO USER(TENDANGNHAP,MATKHAU,MAKH) VALUES(?,?,?)'
    const params = [user.userName, user.password, insert_client_id]
    try {
        const data = await database.query(sqlString, params)
        return true
    } catch (error) {
        return false
    }

}

exports.createCustomer = async (ten, sdt, diachi) => {
    const sqlString = 'INSERT INTO KHACHHANG(TENKH, SDT, DIACHI) VALUES(?,?,?)'
    try {
        const data = await database.query(sqlString, [ten, sdt, diachi])
        return data.insertId
    } catch (error) {
        return null
    }
}

exports.updateRefeshToken = async (username, refeshToken) => {
    const sqlString = "UPDATE USER SET REFESHTOKEN = ? WHERE TENDANGNHAP = ?"
    const params = [refeshToken, username]
    try {
        const data = await database.query(sqlString, params)
    } catch (error) {

    }
}

exports.updateClient = async (makh, data) => {
    const name = data.name
    const phone = data.phone
    const adress = data.adress
    if (!name && !phone && !adress) return false
    let setString = ''
    let params = []

    if (name) {
        setString += 'TENKH = ?'
        params.push(name)
        if (phone) {
            setString += ',SDT = ?',
                params.push(phone)
        }
        if (adress) {
            setString += ',DIACHI = ?'
            params.push(adress)
        }
    } else {
        if (phone) {
            setString += 'SDT = ?',
                params.push(phone)
            if (adress) {
                setString += ',DIACHI = ?'
                params.push(adress)
            }
        } else {
            if (adress) {
                setString += 'DIACHI = ?'
                params.push(adress)
            }
        }
    }
    const sqlString_updateClient = `UPDATE KHACHHANG SET ${setString} WHERE MAKH = ?`
    params.push(makh)
    try {
        const data = await database.query(sqlString_updateClient, params)
        return true
    } catch (error) {
        return false
    }
}


exports.findClientByPhone = async (phone) => {
    const sqlString = 'SELECT * FROM KHACHHANG WHERE SDT = ?'
    try {
        const data = database.query(sqlString, [phone])
        return data
    } catch (error) {
        console.log(`Loi tim kh qu sdt: ${error.message}`)
        return null
    }
}

exports.phoneExists = async (phone, makh) => {
    const sqlString = "SELECT * FROM KHACHHANG WHERE SDT = ? AND MAKH <> ?"
    try {
        const data = database.query(sqlString, [phone, makh])
        if(!data || !data.length >0) return false
        return true
    } catch (error) {
        return false
    }
}