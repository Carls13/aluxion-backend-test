/* eslint-disable no-async-promise-executor */
const { s3Bucket } = require("../../../config");
const s3 = require("../../../utils/s3");

const uploadImage = (imageData, imageName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const buf = new Buffer(imageData.replace(/^data:image\/\w+;base64,/, ""),'base64');

            const params = {
                Bucket: s3Bucket, 
                Key: imageName, 
                Body: buf,
                ACL: 'public-read',
            };
            s3.upload(params, function(s3Err, data) {
                if (s3Err) {
                    throw s3Err;
                };
                console.log(`File uploaded successfully at ${data?.Location}`)
                resolve({
                    imageURL: data?.Location,
                });
            });
           
        } catch (e) {
            reject(e.message);
        }
    });
};

module.exports = 
    uploadImage
;