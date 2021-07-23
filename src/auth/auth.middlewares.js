const userModel = require('../user/user.models')
const authMethod = require('./auth.methods')

exports.isAuth = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
        return res.status(401).send("Không tìm thấy Access Token!")
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await authMethod.verifyToken(
        accessTokenFromHeader,
        accessTokenSecret
    )

    if(!verified){
        return res.status(401).send('Bạn không có quyền truy cập vào tính năng này!')
    }

    let user = await userModel.getUser(verified.payload.username)
    if (user.length == 0)
        user = await userModel.getUserByGoogle(verified.payload.username)
    
    req.user = user
    return next()
}