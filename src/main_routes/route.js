const route = require('express').Router()
const createError = require('http-errors')
const authRouter = require('../auth/auth.routers')
const userRouter = require('../user/user.routers')
const orderRouter = require('../order/order.route')

route.use('/users', userRouter)
route.use('/auth', authRouter)
route.use('/order',orderRouter)

route.get('/', (req, res) => {
    res.send('APP IS RUNNING')
})

route.use((req, res, next) => {
    next(createError(404))
})

route.use((err, req, res) => {
    console.log(err.stack)
    res.status(err.status || 500).send(err.message)
})


module.exports = route