const userModel = require('../user/user.models')
const authMethod = require('./auth.methods')
const bcrypt = require('bcrypt')
const randToken = require('rand-token')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    const userName = req.body.userName.toLowerCase();
    const user = await userModel.getUser(userName);
    if (!user || user.length > 0) {
        res.status(404).send('Tên tài khoản đã tồn tại')
    }
    else {
        const password = bcrypt.hashSync(req.body.password, 10)
        const newUser = {
            userName,
            password
        }
        const createUser = await userModel.createUser(newUser)
        if (!createUser) {
            return res.status(500)
                .send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại')
        }
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const dataForAccessToken = {
            username: userName
        }
        const accessToken = await authMethod.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife
        )

        if (!accessToken) {
            return res.status(401).send("Đăng nhập không thành công, vui lòng thử lại")
        }

        let refeshToken = randToken.generate(16);
        if (!user.refeshtoken) {
            await userModel.updateRefeshToken(userName, refeshToken)
        } else {
            refeshToken = user.refeshToken
        }


        return res.json({
            msg: "Đăng Kí Thành Công",
            username: userName,
            accessToken: accessToken
        })
    }
}

module.exports.login = async (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    let user
    try {
        const users = (await userModel.getUser(userName))
        if (!users || !users.length >0) {
            return res.status(401).send('Tên đặng nhập không tồn tại!')
        }
        user = users[0]
    } catch (error) {
        
    }
    

    
    const isPasswordvalid = bcrypt.compareSync(password, user.password)
    if (!isPasswordvalid) {
        return res.status(401).send("Mật khẩu không chính xác!")
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const dataForAccessToken = {
        username: userName
    }
    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
    )

    if (!accessToken) {
        return res.status(401).send("Đăng nhập không thành công, vui lòng thử lại")
    }

    let refeshToken = randToken.generate(16);
    if (!user.refeshtoken) {
        await userModel.updateRefeshToken(user.tendangnhap, refeshToken)
    } else {
        refeshToken = user.refeshToken
    }

    return res.json({
        msg: "Đăng nhập thành công",
        accessToken,
        refeshToken,
        ...user
    })
}

module.exports.refreshToken = async (req, res) => {

    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send("Không tìm thấy access token")
    }

    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send("Không tìm thấy refresh token")
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

    const decode = await authMethod.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret
    )

    if (!decode) {
        return res.status(404).send("Access Token không hợp lệ")
    }
    const userName = decode.payload.username
    const user = (await userModel.getUser(userName))[0]

    console.log(userName)
    if (!user) {
        return res.status(404).send("User không tồn tại!")
    }

    if (refreshTokenFromBody != user.refeshtoken) {
        return res.status(400).send("refresh token không hợp lệ!")
    }

    const dataForAccessToken = {
        userName
    }
    const accessToken = await authMethod.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife
    )

    if (!accessToken) {
        return res.status(400).send("Tạo access token không thành công, vui lòng thử lại")
    }

    return res.json({
        accessToken
    })
}

