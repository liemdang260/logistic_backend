const wareHouseModel = require('./warehhouse.models')

module.exports.getAll = async (req, res) => {
    try {
        const data = await wareHouseModel.getAll()
        if (!data) {
            return res.status(500).send('Lỗi khi lấy kho, vui lòng thử lại!')
        }
        res.json(data)
    } catch (error) {

    }
}

module.exports.getWarehouseByProvince = async (req, res) => {
    const tinh = req.query.tinh
    try {
        const data = await wareHouseModel.getWarehouseByProvince(tinh)
        if (data === null)
            throw new error("lỗi")
        return res.json(data)
    } catch (error) {
        return res.status(500).send('Có lỗi xảy ra, vui lòng thử lại!')
    }

}