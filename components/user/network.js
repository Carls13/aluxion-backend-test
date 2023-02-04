const express = require("express");
const { success, error } = require("../../network/response");
const router = express.Router();
const controller = require("./controller");

const Validator = require("validatorjs");

router.post("/", (req, res) => {
  const { body } = req;

  const validationRules = {
    email: "required|email",
    username: "required",
    password: "required",
  };

  let validation = new Validator(body, validationRules);

  if (validation.fails()) {
    error(req, res, "Invalid data", 400, new Error("Invalid data"));
    return;
  }

  controller
    .registerUser(body)
    .then((data) => success(req, res, data, 201))
    .catch((errorMessage) => error(req, res, errorMessage, 401));
});

router.post("/login", (req, res) => {
  const { body } = req;
  const { email, password } = body;

  const validationRules = {
    email: "required|email",
    password: "required",
  };

  let validation = new Validator(body, validationRules);

  if (validation.fails()) {
    error(req, res, "Invalid data", 400, new Error("Invalid data"));
    return;
  }

  controller
    .login(email, password)
    .then((data) => success(req, res, data, 200))
    .catch((errorMessage) => error(req, res, errorMessage, 401));
});

router.post("/forgot-password", (req, res) => {
  const { body } = req;
  const { email } = body;

  const validationRules = {
    email: "required|email",
  };

  let validation = new Validator(body, validationRules);

  if (validation.fails()) {
    error(req, res, "Invalid email", 400, new Error("Invalid email"));
    return;
  }

  controller
    .forgotPassword(email)
    .then((data) => success(req, res, data, 200))
    .catch((errorMessage) => error(req, res, errorMessage, 401));
});

module.exports = router;
