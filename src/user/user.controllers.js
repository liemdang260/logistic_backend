const userModel = require('./user.models')

exports.updateUser = async (req,res)=>{
    const data = req.body.user
    console.log(req.user[0].makh)
    const result = await userModel.updateClient(req.user[0].makh,data)
    if(result){
        res.status(201).send("Update thành công!")
    }else{
        res.status(201).send("update thất bại!")
    }
}