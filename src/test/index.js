const userModel = require('../user/user.models')
const database = require('../database/mysql')

async function test(){
    const data = await userModel.getUser("haha")
    console.log(data)

}
test()