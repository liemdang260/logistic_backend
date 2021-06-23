const route = require('express').Router()
const warehouseController = require('./warehouse.controllers')

route.get('/',warehouseController.getAll)

module.exports = route