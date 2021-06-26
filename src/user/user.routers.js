const express = require('express')
const authMiddleware = require('../auth/auth.middlewares')
const userController = require('./user.controllers')

const router = express.Router()

router.get('/profile',authMiddleware.isAuth,async(req, res)=>{
    res.send(req.user)
})

router.get('/findbyphone',userController.findByPhone)

router.post('/update',authMiddleware.isAuth,userController.updateUser)
module.exports = router

