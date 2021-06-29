const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'liemdang',
    api_key: '321311265294461',
    api_secret: 'fGw0ozYWF_xEa-NcfJu43fb7vuU',
    secure: true
});

exports.upload = async (file, folder) => {
    return new Promise((onSuccess, onError) => {
        cloudinary.uploader.upload(file,
            function (error, result) {
                if(error){
                    onError(error)
                }
                else{
                    onSuccess(result)
                }
             });
    })
}