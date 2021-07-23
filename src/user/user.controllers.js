const userModel = require('./user.models')

exports.updateUser = async (req, res) => {
    const data = req.body

    try {
        const phoneExist = await userModel.phoneExist(data)
        if (phoneExist) {
            return res.status(409).send("Số điện thoại này đã tồn tại!")
        }
    } catch (error) {

    }
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

exports.getProfile = async (req, res) => {
    const id = req.user[0].makh
    try {
        const data = await userModel.getCustomerById(id)
        if (!data || !data.length > 0)
            return res.status(404).send("Không tìm thấy khách hàng này!")
        return res.json({
            ...data[0],
            ...req.user[0]
        })
    } catch (error) {
        res.status(500).send("Lỗi khi tìm kiếm khách hàng, vui lòng thử lại!")
    }
}