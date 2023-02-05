/* eslint-disable no-async-promise-executor */
const { s3Bucket } = require('../../config');
const s3 = require('../../utils/s3');
const unsplashClient = require('../../utils/unsplash');

const fs = require('fs').promises;

const listImages = (page = 1, limit = 10, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await unsplashClient.search.getPhotos({
                page,
                perPage: limit,
                query: search
            });

            const images = request.response.results;

            resolve({ images });
           
        } catch (e) {
            reject(e.message);
        }
    });
};

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

const updateBucketFileName = (imageKey, newFileName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                Key: newFileName,
                Bucket: s3Bucket,
                CopySource: `/${s3Bucket}/${imageKey}`,
                ACL: 'public-read',
            };

            s3.copyObject(params, function(s3Err, data) {
                if (s3Err) {
                    reject(s3Err.message);
                };

                const newURL = `https://${s3Bucket}.s3.eu-west-1.amazonaws.com/${newFileName}`;

                resolve({
                    imageURL: newURL,
                });
            });
        } catch (e) {
            console.log('thIS',e);
            reject(e.message);
        }
    });
};

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

const uploadUnsplashImageToBucket = (imageId, imageName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await unsplashClient.photos.get({
                photoId: imageId
            });

            if (!request.response) throw new Error("Image was not found");

            const imageURL = request.response.urls.raw;

            const res = await fetch(imageURL);
            const blob = await res.buffer();

            const params = {
                Bucket: s3Bucket,
                Key: imageName,
                Body: blob,
                ACL: 'public-read',
            };

            s3.upload(params, function(s3Err, data) {
                if (s3Err) {
                    reject(s3Err.message);
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

module.exports = {
    listImages,
    uploadImage,
    listImagesFromBucket,
    uploadUnsplashImageToBucket,
    downloadBucketImage,
    updateBucketFileName,
};