/* eslint-disable no-async-promise-executor */
const { s3Bucket } = require('../../../config');
const s3 = require('../../../utils/s3');

const fs = require('fs').promises;

const downloadBucketImage = (imageKey, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                Key: imageKey,
                Bucket: s3Bucket
            };
            s3.getObject(params, async function(s3Err, data) {
                if (s3Err) {
                    reject(s3Err.message);
                };

                const { Body } = data;

                await fs.writeFile(location, Body)

                resolve(true);
            });
           
        } catch (e) {
            reject(e.message);
        }
    });
};

module.exports = downloadBucketImage;