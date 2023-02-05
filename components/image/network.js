const express = require("express");
const { backendStaticPath } = require("../../config");
const { success, error } = require("../../network/response");
const { verifyToken } = require("../../utils/token");
const router = express.Router();
const controller = require("./controller");

const Validator = require("validatorjs");

router.get("/", verifyToken, (req, res) => {
  const { page, limit, search } = req.query;

  const validationRules = {
    search: "required|string",
    page: "integer",
    limit: "integer",
  };

  let validation = new Validator(req.query, validationRules);

  if (validation.fails()) {
    error(
      req,
      res,
      "Invalid search query",
      400,
      new Error("Invalid search query")
    );
    return;
  }

  controller
    .listImages(page, limit, search)
    .then((data) => success(req, res, data, 200))
    .catch((errorMessage) => error(req, res, errorMessage, 500));
});

router.get("/bucket", verifyToken, (req, res) => {
  controller
    .listImagesFromBucket()
    .then((data) => success(req, res, data, 200))
    .catch((errorMessage) => error(req, res, errorMessage, 500));
});

router.get("/bucket/:key", verifyToken, (req, res) => {
  const { key } = req.params;

  const validationRules = {
    key: "required|string",
  };

  let validation = new Validator(req.params, validationRules);

  if (validation.fails()) {
    error(req, res, "Invalid key", 400, new Error("Invalid key"));
    return;
  }

  const location = `${__dirname}/../../static/${key}`;
  const imageURL = `${backendStaticPath}${key}`;

  controller
    .downloadBucketImage(key, location)
    .then(() =>
      success(
        req,
        res,
        {
          key,
          imageURL,
        },
        200
      )
    )
    .catch((errorMessage) => error(req, res, errorMessage, 500));
});

router.put("/bucket/:key", verifyToken, (req, res) => {
  const { key } = req.params;
  const { newFileName } = req.body;

  const validationRules = {
    key: "required|string",
    newFileName: "required|string",
  };

  let validation = new Validator({ key, newFileName }, validationRules);

  if (validation.fails()) {
    error(req, res, "Invalid data", 400, new Error("Invalid data"));
    return;
  }

  controller
    .updateBucketFileName(key, newFileName)
    .then((data) =>
      success(
        req,
        res,
        data,
        200
      )
    )
    .catch((errorMessage) => error(req, res, errorMessage, 500));
});

router.post("/", verifyToken, (req, res) => {
  const { imageName, imageData } = req.body;

  const validationRules = {
    imageName: "required|string",
    imageData: "required|string",
  };

  let validation = new Validator(req.body, validationRules);

  if (validation.fails()) {
    error(req, res, "Invalid data", 400, new Error("Invalid data"));
    return;
  }

  controller
    .uploadImage(imageData, imageName)
    .then((data) => success(req, res, data, 200))
    .catch((errorMessage) => error(req, res, errorMessage, 500));
});

router.post("/:imageId/upload", verifyToken, (req, res) => {
  const { imageId } = req.params;
  const { imageName } = req.body;

  const validationRules = {
    imageName: "required|string",
    imageData: "required|string",
  };

  let validation = new Validator({...req.body, ...req.params }, validationRules);

  if (validation.fails()) {
    error(req, res, "Invalid data", 400, new Error("Invalid data"));
    return;
  }

  controller
    .uploadUnsplashImageToBucket(imageId, imageName)
    .then((data) => success(req, res, data, 200))
    .catch((errorMessage) => error(req, res, errorMessage, 404));
});

module.exports = router;
