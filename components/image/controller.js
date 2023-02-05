/* eslint-disable no-async-promise-executor */
const listImages = require('./controllers/list-images.controller');
const listImagesFromBucket = require('./controllers/list-images-from-bucket.controller');
const downloadBucketImage = require('./controllers/download-bucket-image.controller');
const uploadImage = require('./controllers/upload-image-to-bucket.controller');
const uploadUnsplashImageToBucket = require('./controllers/upload-unsplash-image-to-bucket.controller');
const updateBucketFileName = require('./controllers/update-bucket-file-name.controller');

module.exports = {
    listImages,
    uploadImage,
    listImagesFromBucket,
    uploadUnsplashImageToBucket,
    downloadBucketImage,
    updateBucketFileName,
};