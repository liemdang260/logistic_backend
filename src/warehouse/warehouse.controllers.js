const wareHouseModel = require('./warehhouse.models')

module.exports.getAll = async (req, res) => {
    try {
        const data = await wareHouseModel.getAll()
        if(!data){
            return res.status(500).send('Lỗi khi lấy kho, vui lòng thử lại!')
        }
        res.json(data)
    } catch (error) {
        
    }
}