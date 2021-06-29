const cloudinary = require('../services/cloudinary')

exports.uploadFile = async (files)=>{
    const uploader = async (path) => {
        try {
            return await clouldinary.upload(path, 'Images')
        } catch (error) {
            console.log(error.message)
        }
    }

    const urls = []
    for (let file of files) {
        const { path } = file
        const result = await uploader(path)
        urls.push({
            id:result.public_id,
            url:result.url
        })
        fs.unlinkSync(path)
    }

    return urls
}