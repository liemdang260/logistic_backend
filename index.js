const express = require('express')
const route = require('./src/main_routes/route')
const createError = require('http-errors')
const authRouter = require('./src/auth/auth.routers')
const userRouter = require('./src/user/user.routers')
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cors = require('cors')


dotenv.config()

const PORT = process.env.PORT|| 9999;
const app = express()



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



app.use('/',route)

app.listen(PORT, () => {
    console.log(`App start at port ${PORT}`)
})