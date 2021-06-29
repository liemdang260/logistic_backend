const orderModel = require('./order.models')
const multiparty = require('multiparty')
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
    const user = req.user[0]
    
    const parse = async (req) => {
        return new Promise((onSuccess, onError) => {
            let form = new multiparty.Form();
            form.parse(req, function (err, fields, files) {
                if (err) {
                    onError(err)
                } else {
                    onSuccess({fields, files})
                }
            });
        })
    }
    

    const data = await parse(req)
    
    const created = await orderModel.create(user.makh,data)
    if (!created) {
        return res.status(400).send("Lỗi khi tạo đơn hàng, vui lòng thử lại!")
    }
    return res.send("Tạo đơn hàng thành công")
}

exports.delete = async (req, res) => {
    const id = req.params.id
    const makh = req.user[0].makh
    try {
        const data = await orderModel.delete(id)
        if (!data) {
            return res.status(500).send('Lỗi khi xóa đơn hàng!')
        }
    } catch (error) {
        console.log('Lỗi khi xóa đơn hàng!')
        return res.status(500).send('Lỗi khi xóa đơn hàng!')
    }
    return res.send('Xóa đơn hàng thành công')
}


exports.getOrderById = async (req, res) => {
    const id = req.params.id
    try {
        const data = await orderModel.getOrderById(id)
        console.log(data)
        if (data === null){
            return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại!")
        }else if(data === false) {
            return res.status(404).send("Không tìm thấy mã đơn hàng, vui lòng thử lại!")
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại!")
    }
}

exports.getOrderSend = async (req, res) => {
    const id = req.user[0].makh
    try {
        const data = await orderModel.getOrderSendById(id)
        if (!data) {
            return res.status(500).send("Lỗi khi lây đơn hàng, vui lòng thử lại sau!")
        }
        res.json(data)
    } catch (error) {
        return res.status(500).send("Lỗi khi lây đơn hàng, vui lòng thử lại sau!")
    }
}

exports.getOrderReceive = async (req, res) => {
    const id = req.user[0].makh
    try {
        const data = await orderModel.getorderReceiveById(id)
        if (!data) {
            return res.status(500).send("Lỗi khi lây đơn hàng, vui lòng thử lại sau!")
        }
        res.json(data)
    } catch (error) {
        return res.status(500).send("Lỗi khi lây đơn hàng, vui lòng thử lại sau!")
    }
}