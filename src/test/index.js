const express = require('express')

const clouldinary = require('../services/cloudinary')
const upload = require('../services/multer')
const fs = require('fs')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index')
})


app.post('/', upload.array('image'), async (req, res) => {
    const uploader = async (path) => {
        try {
            return await clouldinary.upload(path, 'Images')
        } catch (error) {
            console.log(error.message)
        }
    }

    const urls = []
    const files = req.files
    for (let file of files) {
        const { path } = file
        const result = await uploader(path)
        urls.push({
            id:result.public_id,
            url:result.url
        })
        fs.unlinkSync(path)
    }

    res.json(urls)
})


app.listen(PORT, () => {
    console.log(`serer run at ${PORT}`)
})