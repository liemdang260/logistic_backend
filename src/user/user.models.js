const { compare } = require('bcrypt');
const database = require('../database//mysql')

exports.getUser = async (userName) => {
    const sqlString = 'SELECT * from user where username = ?'
    try {
        return await database.query(sqlString, [userName])
    } catch (error) {
        return null;
    }
}

exports.getUserByGoogle = async (username) => {
    const sqlString = 'select * from userbygoogle where username = ?'
    try {
        const data = await database.query(sqlString, [username])
        return data
    } catch (error) {
        return null
    }
}

exports.createUser = async (user) => {
    let insert_client_id
    const sqlString_createClient = 'insert into khachhang values()'
    try {
        const data = await database.query(sqlString_createClient)
        insert_client_id = data.insertId
    } catch (error) {
        console.log(error.message)
        return null
    }

    if (!insert_client_id) return false

    const sqlString = 'insert into user(username,password,makh) values(?,?,?)'
    const params = [user.userName, user.password, insert_client_id]
    try {
        const data = await database.query(sqlString, params)
        return true
    } catch (error) {
        return false
    }

}

exports.createUserWithGoogle = async (username, customercode) => {
    const sqlString = 'insert into userbygoogle(username,makh) values (?,?)'
    try {
        const result = await database.query(sqlString, [username, customercode])
        return result
    } catch (error) {
        console.log(error.message)
        return null
    }
}
exports.createCustomer = async (ten, sdt, diachi) => {
    const sqlString = 'insert into khachhang(TenKH, SDT, DiaChi) values(?,?,?)'
    try {
        const data = await database.query(sqlString, [ten, sdt, diachi])
        return data.insertId
    } catch (error) {
        return null
    }
}

exports.updateRefeshToken = async (username, refeshToken) => {
    const sqlString = "update user set refeshtoken = ? where username = ?"
    const params = [refeshToken, username]
    try {
        const data = await database.query(sqlString, params)
    } catch (error) {

    }
}

exports.updateRefeshTokenByGoogle = async (username, refeshToken) => {
    const sqlString = "update userbygoogle set refeshtoken = ? where username = ?"
    const params = [refeshToken, username]
    try {
        const data = await database.query(sqlString, params)
        console.log(data)
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
        setString += 'TenKH = ?'
        params.push(name)
        if (phone) {
            setString += ',SDT = ?',
                params.push(phone)
        }
        if (adress) {
            setString += ',DiaChi = ?'
            params.push(adress)
        }
    } else {
        if (phone) {
            setString += 'SDT = ?',
                params.push(phone)
            if (adress) {
                setString += ',DiaChi = ?'
                params.push(adress)
            }
        } else {
            if (adress) {
                setString += 'DiaChi = ?'
                params.push(adress)
            }
        }
    }
    const sqlString_updateClient = `update khachhang set ${setString} where MaKH = ?`
    params.push(makh)
    try {
        const data = await database.query(sqlString_updateClient, params)
        return true
    } catch (error) {
        return false
    }
}


exports.findClientByPhone = async (phone) => {
    const sqlString = 'select * from khachhang where SDT = ?'
    try {
        const data = database.query(sqlString, [phone])
        return data
    } catch (error) {
        console.log(`Loi tim kh qu sdt: ${error.message}`)
        return null
    }
}

exports.phoneExists = async (phone, makh) => {
    const sqlString = "select * from khachhang where SDT = ? and MaKH <> ?"
    try {
        const data = database.query(sqlString, [phone, makh])
        if (!data || !data.length > 0) return false
        return true
    } catch (error) {
        return false
    }
}

exports.getCustomerById = async (id) => {
    const sqlString = 'select * from khachhang where makh = ?'
    try {
        const data = await database.query(sqlString, [id])
        return data
    } catch (error) {

    }
}


exports.getAllCustomer = async () => {
    const sqlString = 'select  kh.MaKH as makh,kh.TenKH as tenkh,kh.SDT as sdt,kh.DiaChi as diachi, count(od.madonhang) as sodonhang '
        + 'from khachhang kh LEFT join `order` od on kh.MaKH = od.makh '
        + 'GROUP by kh.MaKH,kh.TenKH,kh.SDT,kh.DiaChi'
    try {
        const data = await database.query(sqlString)
        return data
    } catch (error) {
        return null
    }
}

exports.deleteCustomer = async(id)=>{
    const sqlString = 'delete from khachhang where Makh = ? '
    try {
        const result = await database.query(sqlString,[id])
        console.log(result)
        return result.affectedRows
    } catch (error) {
        console.log(error.message)
        return null
    }
}