const express = require('express')
const route = require('./src/main_routes/route')
const createError = require('http-errors')
const authRouter = require('./src/auth/auth.routers')
const userRouter = require('./src/user/user.routers')
const dotenv = require('dotenv')

dotenv.config()

const PORT = 9999;
const app = express()

// app.use(express.json())
// app.use(express.urlencoded())

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// app.use('/users', userRouter)
// app.use('/auth', authRouter)

// app.get('/', (req, res) => {
//     res.send('APP IS RUNNING')
// })

// app.use((req, res, next) => {
//     next(createError(404))
// })

// app.use((err, req, res) => {
//     console.log(err.stack)
//     res.status(err.status || 500).send(err.message)
// })
app.use('/',route)

app.listen(PORT, () => {
    console.log(`App start at port ${PORT}`)
})