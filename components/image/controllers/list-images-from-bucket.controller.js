/* eslint-disable no-async-promise-executor */
const { s3Bucket } = require('../../../config');
const s3 = require('../../../utils/s3');

const listImagesFromBucket = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                Bucket: s3Bucket, 
            };

            s3.listObjectsV2(params, function(s3Err, data) {
                if (s3Err) {
                    reject(s3Err.message);
                };
                resolve({
                    images: data.Contents,
                })
            });
           
        } catch (e) {
            reject(e.message);
        }
    });
};


module.exports = listImagesFromBucket;