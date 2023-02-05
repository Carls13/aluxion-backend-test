/* eslint-disable no-async-promise-executor */
const { s3Bucket } = require("../../../config");
const s3 = require("../../../utils/s3");
const unsplashClient = require("../../../utils/unsplash");

const uploadUnsplashImageToBucket = (imageId, imageName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const request = await unsplashClient.photos.get({
        photoId: imageId,
      });

      if (!request.response) throw new Error("Image was not found");

      const imageURL = request.response.urls.raw;

      const res = await fetch(imageURL);
      const blob = await res.buffer();

      const params = {
        Bucket: s3Bucket,
        Key: imageName,
        Body: blob,
        ACL: "public-read",
      };

      s3.upload(params, function (s3Err, data) {
        if (s3Err) {
          reject(s3Err.message);
        }
        console.log(`File uploaded successfully at ${data?.Location}`);
        resolve({
          imageURL: data?.Location,
        });
      });
    } catch (e) {
      reject(e.message);
    }
  });
};

module.exports = uploadUnsplashImageToBucket;
