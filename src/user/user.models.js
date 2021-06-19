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
        console.log(data)
        return true
    } catch (error) {
        return false
    }

}

exports.updateRefeshToken = async (username, refeshToken) => {
    const sqlString = "UPDATE USER SET REFESHTOKEN = ? WHERE TENDANGNHAP = ?"
    const params = [refeshToken, username]
    console.log(refeshToken, username)
    try {
        const data = await database.query(sqlString, params)
        console.log(data)
    } catch (error) {

    }
}

exports.updateClient = async (makh,data) => {
    const name = data.name
    const phone = data.phone
    const adress = data.adress
    if(!name&&!phone&&!adress) return false
    let setString = ''
    let params = []
    
    if(name) {
        setString += 'TENKH = ?'
        params.push(name)
        if(phone){
            setString+=',SDT = ?',
            params.push(phone)
        }
        if(adress){
            setString+=',DIACHI = ?'
            params.push(adress)
        }
    }else{
        if(phone){
            setString+='SDT = ?',
            params.push(phone)
            if(adress){
                setString+=',DIACHI = ?'
                params.push(adress)
            }
        }else{
            if(adress){
                setString+='DIACHI = ?'
                params.push(adress)
            }
        }
    }
    const sqlString_updateClient = `UPDATE KHACHHANG SET ${setString} WHERE MAKH = ?`
    params.push(makh)
    console.log(sqlString_updateClient,params)
    try {
        const data = await database.query(sqlString_updateClient,params)
        console.log(data)
        return true
    } catch (error) {
        return false
    }
}