const express = require("express");
const { backendStaticPath } = require("../../config");
const { success, error } = require("../../network/response");
const { verifyToken } = require("../../utils/token");
const router = express.Router();
const controller = require("./controller");

router.get(
  "/",
  verifyToken,
  (req, res) => {
    const { page, limit, search } = req.query;

    controller
      controller.listImages(page, limit, search)
      .then((data) => success(req, res, data, 200))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

router.get(
  "/bucket",
  verifyToken,
  (req, res) => {

    controller
      controller.listImagesFromBucket()
      .then((data) => success(req, res, data, 200))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

router.get(
  "/bucket/:key",
  verifyToken,
  (req, res) => {
    const { key } = req.params;

    const location = `${__dirname}/../../static/${key}`;
    const imageURL = `${backendStaticPath}${key}`;

    controller
      controller.downloadBucketImage(key, location)
      .then(() => success(req, res, {
        key,
        imageURL,
      }, 200))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

router.post(
  "/",
  verifyToken,
  (req, res) => {
    const { imageName, imageData } = req.body;

    controller
      controller.uploadImage(imageData, imageName)
      .then((data) => success(req, res, data, 200))
      .catch((errorMessage) => error(req, res, errorMessage, 500));
  }
);

router.post(
  "/:imageId/upload",
  verifyToken,
  (req, res) => {
    const { imageId } = req.params;
    const { imageName } = req.body;

    controller.uploadUnsplashImageToBucket(imageId, imageName)
      .then((data) => success(req, res, data, 200))
      .catch((errorMessage) => error(req, res, errorMessage, 404));
  }
);


module.exports = router;
