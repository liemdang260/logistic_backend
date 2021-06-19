const { Router } = require('express')
const express = require('express')
const authController = require('./auth.controllers')
const router = express.Router()


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh', authController.refreshToken)

module.exports = router