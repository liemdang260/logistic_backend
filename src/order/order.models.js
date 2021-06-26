const database = require('../database/mysql')
const userModel = require('../user/user.models')
exports.getAll = async (makh) => {
    const sqlstring = 'select od.madonhang, odd.chieucao, odd.cannang, odd.diachidi, odd.diachiden,gh.tenloai as loaigiaohang,dh.tenloai as loaidonhang,od.phi,th.tentrangthai as trangthai '
        + 'from khachhang kh '
        + 'JOIN `order` od on od.makh = kh.MaKH '
        + 'JOIN orderdetail odd on odd.madonhang = od.madonhang '
        + 'JOIN loaidonhang dh on dh.maloai = odd.loaidonhang '
        + 'JOIN loaigiaohang gh on gh.maloai = odd.loaigiaohang '
        + 'JOIN trangthai th on th.matrangthai = od.trangthai '
        + 'where kh.MaKH = ?'
    const params = [makh]
    try {
        const data = await database.query(sqlstring, params)
        return data
    } catch (error) {
        console.log("loi khi query")
        return null
    }
}

exports.create = async (makh, data) => {

    const nguoinhan = (await userModel.findClientByPhone(data.sdt))[0]
    let manguoinhan = 0
    if (!nguoinhan) {
        manguoinhan = await userModel.createCustomer(data.nguoinhan, data.sdt, data.diachidi)
    } else {
        manguoinhan = nguoinhan.MaKH
    }

    const orderInsert = (async (makh, data) => {
        const insertOrder = 'INSERT INTO `ORDER`(MAKH,PHI,NGUOINHAN,DIACHINHAN) VALUES(?,?,?,?)'
        const params = [makh, data.phi, manguoinhan, data.diachiden]
        try {
            const result = await database.query(insertOrder, params)
            return result.insertId
        } catch (error) {
            console.log('loi khi them don hang')
            return false
        }
    })
    const id = await orderInsert(makh, data)
    if (!id) return false

    const insertOrderDetail = 'INSERT INTO ORDERDETAIL(MADONHANG,CHIEUCAO,CANNANG,DIACHIDI,DIACHIDEN,LOAIDONHANG,LOAIGIAOHANG) VALUES(?,?,?,?,?,?,?)'
    const params = [
        id,
        data.chieucao,
        data.cannang,
        data.diachidi,
        data.diachiden,
        data.loaidonhang,
        data.loaigiaohang
    ]
    try {
        const result = await database.query(insertOrderDetail, params)
        return true
    } catch (error) {
        console.log(`Loi khi them chi tiet: ${error.message}`)
        const deleteOrder = `DELETE ORDER WHERE MADONHANG = ?`
        try {
            const result = await database.query(deleteOrder, [id])
        } catch (error) {
            console.log("Loi nghien trong")
            console.log(error.message)
        }
        return false
    }


}

exports.delete = async (id) => {
    const deleteOrderString = 'DELETE FROM `ORDER` WHERE MADONHANG = ?'
    try {
        const data = await database.query(deleteOrderString, [id])
        return data.affectedRows
    } catch (error) {
        console.log(error.message)
        return false
    }

}

exports.isPermission = async (makh, id) => {
    const sqlString = 'SELECT * FROM `order` where makh = ? and madonhang = ?'
    try {
        const data = await database.query(sqlString, [makh, id])
        return (!data || !data.length > 0)
    } catch (error) {
        console.log(`kiem tra don hang loi: ${error.message}`)
        return false
    }
}

exports.getOrderById = async (id) => {
    const sqlString = 'select od.madonhang, odd.chieucao, odd.cannang, odd.diachidi, odd.diachiden,gh.tenloai as loaigiaohang,dh.tenloai as loaidonhang,od.phi,od.trangthai as trangthai '
        + 'from khachhang kh '
        + 'JOIN `order` od on od.makh = kh.MaKH '
        + 'JOIN orderdetail odd on odd.madonhang = od.madonhang '
        + 'JOIN loaidonhang dh on dh.maloai = odd.loaidonhang '
        + 'JOIN loaigiaohang gh on gh.maloai = odd.loaigiaohang '
        + 'where odd.madonhang = ?'
    try {
        return await database.query(sqlString, [id])
    } catch (error) {
        console.log(`loi khi lay don hang: ${error.message}`)
    }
}


exports.getOrderSendById = async (id) => {
    const sqlString = 'select od.madonhang, kh.tenkh as nguoinhan, kh.SDT, od.trangthai,od.diachinhan '
        + 'from `order` od join khachhang kh on od.nguoinhan = kh.MaKH '
        + 'where od.makh = ?'
    try {
        const data = await database.query(sqlString, [id])
        return data
    } catch (error) {
        return null
    }
}

exports.getorderReceiveById = async (id) => {
    const sqlString = 'select od.madonhang, kh.TenKH as nguoigui, kh.SDT, od.trangthai '
    +'from `order` od join khachhang kh on od.makh = kh.MaKH '
    +'where od.nguoinhan = ?'
    try {
        const data = await database.query(sqlString, [id])
        return data
    } catch (error) {
        console.log(error.message)
        return null
    }
}