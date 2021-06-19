const orderModel = require('./order.models')
exports.getAll = async (req, res) => {
    const user = req.user[0];
    const data = await orderModel.getAll(user.makh)
    if (!data) {
        return res.status(400).send("lỗi")
    }
    res.json(
        data
    )
}

exports.create = async (req, res) => {
    const data = req.body.order
    const user = req.user[0]
    const created = await orderModel.create(user.makh, data)
    if (!created) {
        return res.status(400).send("Lỗi khi tạo đơn hàng, vui lòng thử lại!")
    }
    return res.send("Tạo đơn hàng thành công")
}

exports.delete = async (req, res) => {
    const id = req.params.id
    const makh = req.user[0].makh
    try {
        const data =await orderModel.delete(id)
        if(!data){
            return res.status(500).send('Lỗi khi xóa đơn hàng!')
        }
    } catch (error) {
        console.log('Lỗi khi xóa đơn hàng!')
        return res.status(500).send('Lỗi khi xóa đơn hàng!')
    }
    return res.send('Xóa đơn hàng thành công')
}
