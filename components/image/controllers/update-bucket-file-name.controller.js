/* eslint-disable no-async-promise-executor */
const { s3Bucket } = require("../../../config");
const s3 = require("../../../utils/s3");

const updateBucketFileName = (imageKey, newFileName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                Key: newFileName,
                Bucket: s3Bucket,
                CopySource: `/${s3Bucket}/${imageKey}`,
                ACL: 'public-read',
            };

            s3.copyObject(params, function(s3Err) {
                if (s3Err) {
                    reject(s3Err.message);
                };

                const newURL = `https://${s3Bucket}.s3.eu-west-1.amazonaws.com/${newFileName}`;

                resolve({
                    imageURL: newURL,
                });
            });
        } catch (e) {
            reject(e.message);
        }
    });
};

module.exports =
    updateBucketFileName;