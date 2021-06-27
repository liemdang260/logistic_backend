const orderModel = require('./order.models')
exports.isPermission = async (req, res, next) => {
    const user = req.user[0];
    try {
        const data = await orderModel.isPermission(user.makh, req.params.id)
        if (data) {
            return res.status(401).send('Bạn Không có quyền xóa đơn hàng này!')
        }
    } catch (error) {
        console.log(error.message)
    }
    return next()
}