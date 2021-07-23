const router = require('express').Router()
const adminController = require('./admin.controllers')

router.post('/createadmin',adminController.createAdmin)
router.post('/login',adminController.login)
router.get('/order/all',adminController.getAllOrder)
router.delete('/order/:id',adminController.deleteOrder)
router.get('/order/:id',adminController.getOrderById)
router.put('/order/:id',adminController.updateStatus)
router.get('/client', adminController.getAllClient)
router.delete('/client/:id',adminController.deleteClient)
router.delete('/warehouse/:id',adminController.deleteWarehouse)
module.exports = router