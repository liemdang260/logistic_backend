const userModel = require('./user.models')

exports.updateUser = async (req, res) => {
    const data = req.body.user
    console.log(req.user[0].makh)
    const result = await userModel.updateClient(req.user[0].makh, data)
    if (result) {
        res.status(201).send("Update thành công!")
    } else {
        res.status(201).send("update thất bại!")
    }
}

exports.findByPhone = async (req, res) => {
    try {
        const data = await userModel.findClientByPhone(req.body.phone)
        if (!data) {
            return res.status(404).send("Không tim thấy khách hàng nào! ")
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).send("Lỗi kh tìm kiếm khách hàng, vui lòng thử lại sau!")
    }
}

