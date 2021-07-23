const database = require('../database/mysql')
const userModel = require('../user/user.models')
const clouldinary = require('../services/cloudinary')
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

const uploader = async (path) => {
    try {
        return await clouldinary.upload(path, 'Images')
    } catch (error) {
        console.log(error.message)
    }
}

exports.create = async (makh, data) => {
    const tmp_path = data.files.image[0].path
    const result = await uploader(tmp_path)
    const url = result.url

    const khnhan = data.fields.khnhan
    if (!khnhan || !khnhan.length > 0) {
        return false
    }
    console.log(khnhan)
    const sdt = (JSON.parse(khnhan[0])).sdt
    const diachinhan = data.fields.diachinhan[0]
    const phi = data.fields.chiphi[0]
    const diachidi = data.fields.diachidi[0]

    const nguoinhan = (await userModel.findClientByPhone(sdt))[0]
    console.log(nguoinhan)
    let manguoinhan = 0
    if (!nguoinhan) {
        ten = (JSON.parse(khnhan[0])).name

        manguoinhan = await userModel.createCustomer(ten, sdt, diachinhan)
    } else {
        manguoinhan = nguoinhan.MaKH
    }
    console.log(manguoinhan)
    const orderInsert = (async (makh, data) => {
        const insertOrder = 'insert into `order`(makh,phi,nguoinhan,diachidi,diachinhan,image) values(?,?,?,?,?,?)'
        const params = [makh, data.phi, data.manguoinhan, data.diachidi, data.diachinhan, data.image]
        try {
            const result = await database.query(insertOrder, params)
            return result.insertId
        } catch (error) {
            console.log(`loi khi them don hang : ${error.message}`)
            return false
        }
    })
    const id = await orderInsert(makh, { phi, manguoinhan, diachidi, diachinhan, image: url })
    if (!id) return false
    const orderdetail = JSON.parse(data.fields.dshanghoa[0])


    const insertDetail = async (data) => {
        const insertOrderDetail = 'insert into orderdetail(madonhang,tensp,cannang,soluong) values(?,?,?,?)'
        const params = [
            ...data
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

    for (detail of orderdetail) {
        const params = [id, detail.tensp, detail.cannang, detail.soluong]
        await insertDetail(params)
    }
    return true


}

exports.delete = async (id) => {
    const deleteOrderString = 'delete from `order` where madonhang = ?'
    try {
        const data = await database.query(deleteOrderString, [id])
        console.log(data)
        return data.affectedRows
    } catch (error) {
        console.log(error.message)
        return false
    }

}

exports.isPermission = async (makh, id) => {
    const sqlString = 'select * from `order` where makh = ? and madonhang = ?'
    try {
        const data = await database.query(sqlString, [makh, id])
        return (!data || !data.length > 0)
    } catch (error) {
        console.log(`kiem tra don hang loi: ${error.message}`)
        return false
    }
}

exports.getOrderById = async (id) => {
    const sqlString = 'select od.madonhang, kh.TenKH,kh.SDT,od.diachidi,od.diachinhan,od.image,od.phi,od.trangthai, kh2.TenKH as nguoigui, kh2.SDT as sdtnguoigui '
    +'from `order` od join khachhang kh on od.nguoinhan = kh.MaKH join khachhang kh2 on od.makh = kh2.MaKH '
    +'where od.madonhang = ?'
    let data
    try {
        data = await database.query(sqlString, [id])
        if (!data || !data.length > 0)
            return false
    } catch (error) {
        console.log(`loi khi lay don hang: ${error.message}`)
        return null
    }
    data = data[0]
    let detailOfId
    const getOrderDetail = 'select tensp, cannang,soluong from orderdetail where madonhang = ?'
    try {
        const details = await database.query(getOrderDetail, [id])
        if (!details) {
            return null
        }
        if (!details.length > 0)
            return false
        detailOfId = details
    } catch (error) {
        return null
    }
    console.log(detailOfId)
    const kq = {
        image: data.image,
        dshanghoa: detailOfId,
        khgui:{
            name:data.nguoigui,
            sdt:data.sdtnguoigui
        },
        khnhan: {
            name: data.TenKH,
            sdt: data.SDT,
        },
        diachidi: data.diachidi,
        diachinhan: data.diachinhan,
        chiphi: data.phi,
        trangthai: data.trangthai

    }
    return kq
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
        + 'from `order` od join khachhang kh on od.makh = kh.MaKH '
        + 'where od.nguoinhan = ?'
    try {
        const data = await database.query(sqlString, [id])
        return data
    } catch (error) {
        console.log(error.message)
        return null
    }
}

exports.getAllOrder = async ()=>{
    const sqlstring = 'select od.madonhang,kh2.TenKH as nguoigui, kh.tenkh as nguoinhan, kh.SDT, od.trangthai,od.diachinhan '
    +'from `order` od join khachhang kh on od.nguoinhan = kh.MaKH '
    +'join khachhang kh2 on od.makh = kh2.makh'
    try {
        return await database.query(sqlstring)
    } catch (error) {
        console.log(`loi: ${error.message}`)
        return null
    }
}

exports.updateStatus = async (id, newStatus)=>{
    const sqlString = 'update `order` set trangthai = ? where madonhang = ?'
    try {
        const result = await database.query(sqlString,[newStatus,id])
        return result.affectedRows
    } catch (error) {
        console.log(error.message)
        return null
    }
}