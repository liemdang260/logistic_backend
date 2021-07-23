const route = require('express').Router()
const warehouseController = require('./warehouse.controllers')

route.get('/',warehouseController.getAll)
route.get('/province',warehouseController.getWarehouseByProvince)
module.exports = route