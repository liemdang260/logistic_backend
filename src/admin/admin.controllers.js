const adminModel = require('./admin.models')
const orderModel = require('../order/order.models')
const userModel = require('../user/user.models')
const warehouseModel = require('../warehouse/warehhouse.models')
const bcrypt = require('bcrypt')

exports.createAdmin = async (req, res) => {
    const { username, password } = req.body.user
    const isExists = await adminModel.existsAdminUser(username)
    if (isExists)
        res.status(409).send("Tên tài khoản đã tồn tại!")
    const hashPassword = bcrypt.hashSync(password, 10)
    console.log(hashPassword)
    const insert = await adminModel.createAdminUser({ username, hashPassword })
    if (insert === true)
        res.status(200).send("Tạo thành công")
    else if (insert === false)
        res.status(409).send("Tạo thất bại, vui lòng kiểm tra lại!")
    else
        res.status(500).send('Có lỗi xảy ra, vui lòng thử lại sau!')
}

exports.login = async (req, res) => {
    const { username, password } = req.body.user
    try {
        const user = await adminModel.getAdminUserByUsername(username)
        if (user == null)
            return res.status(500).send('Có lỗi xỷ ra, vui lòng thử lại!')
        if (user.length == 0)
            return res.status(404).send('Tên đăng nhập không tồn tại!')
        console.log(user)
        const isValidPassword = bcrypt.compareSync(password, user[0].pass)
        if (!isValidPassword)
            return res.status(403).send('Mật khẩu không đúng!')
        return res.status(200).send('login thành công')
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('có lỗi xảy ra, vui lòng thử lại!')
    }
}

exports.getAllOrder = async (req, res) => {
    const data = await orderModel.getAllOrder()
    if (data == null) {
        return res.status(500).send('co loi xay ra, vui long thu lai sao')
    }
    res.json(data)

}

exports.deleteOrder = async (req, res) => {
    const id = req.params.id
    try {
        const result = await orderModel.delete(id)
        if (!result) {
            return res.status(500).send('Lỗi khi xóa đơn hàng!')
        }
        return res.status(202).send("Xoa thanh cong")
    } catch (error) {
        console.log('Lỗi khi xóa đơn hàng!')
        return res.status(500).send('Lỗi khi xóa đơn hàng!')
    }
}

exports.getOrderById = async (req, res) => {
    const id = req.params.id
    try {
        const order = await orderModel.getOrderById(id)
        if (order === null) {
            res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại!')
        }
        if (order === false) {
            res.status(404).send("Không tìm thấy mã đơn hàng, vui lòng thử lại")
        }
        res.json(order)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại!')
    }
}

exports.updateStatus = async (req, res) => {
    const id = req.params.id
    const newStatus = req.body.newstatus
    console.log(req.body)
    try {
        const result = await orderModel.updateStatus(id, newStatus)
        if (result === 0) {
            return res.status(409).send('Update thất bại, vui lòng thử lại sau!')
        }
        if (result == null) {
            return res.status(500).send('Có lỗi xảy ra, vui lòng thử lại sau!')
        }
        res.send('Update Thành Công')
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Có lỗi xảy ra, vui lòng thử lại sau!')
    }
}


exports.getAllClient = async (req, res) => {
    try {
        const data = await userModel.getAllCustomer()
        if (data == null)
            throw new error("loi")
        return res.json(data)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send('Có lỗi xảy ra, vui lòng thử lại!')
    }
}

exports.deleteClient = async (req,res) => {
    const id = req.params.id
    try {
        const result = await userModel.deleteCustomer(id)
        if (result == null)
            throw new error("loi")
        return (result > 0)? res.send("Xóa thành công"):res.status(500).send("Có lỗi xảy ra, vui lòng thử lại!")
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Có lỗi xảy ra, vui lòng thử lại!")
    }
}


exports.deleteWarehouse = async (req,res)=>{
    const id = req.params.id
    try{
        const result = await warehouseModel.deleteWarehouseById(id)
        if(result) 
            return res.send('Xoa thanh cong')
        // if(result == null) throw new error("loi")
        return res.status(404).send('khong tim thay kho hang')
    }catch(error){
        console.log(error.message)
        return res.status(500).send('Co loi xay ra, vui long thu lai')
    }
}