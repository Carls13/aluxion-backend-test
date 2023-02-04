const AWS = require('aws-sdk');
const { s3Key, s3Secret } = require('../config');

const s3 = new AWS.S3({
    accessKeyId: s3Key,
    secretAccessKey: s3Secret,
});

module.exports = s3;