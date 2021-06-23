const route = require('express').Router()
const orderController = require('./order.controllers')
const isAuth = require('../auth/auth.middlewares').isAuth
const isPermission = require('./order.middlewares').isPermission


route.get('/', isAuth,orderController.getAll)
route.post('/create', isAuth,orderController.create)
route.get('/:id',orderController.getOrderById)
route.delete('/:id', isAuth, isPermission, orderController.delete)


module.exports = route