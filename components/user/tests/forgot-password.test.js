/**
* @jest-environment node
*/
const request = require("supertest");
const app = require("./../../../app");

// Time in milliseconds
const TIMEOUT = 30 * 1000;

const callbackStatusCodeError = (response, code) => {
  expect(response.statusCode).toBe(code);
};

describe("POST /user/forgot-password should", () => {
  it("send 400 when no body is sent", () => {
    return request(app)
      .post("/user/forgot-password")
      .then((response) => callbackStatusCodeError(response, 400));
  }, TIMEOUT);

  it("send 400 when sending incorrect email", () => {
    return request(app)
      .post("/user/forgot-password")
      .send({
        email: "hello"
      })
      .then((response) => callbackStatusCodeError(response, 400));
  }, TIMEOUT);

  it("send 401 when trying to get a password using a not registered email", () => {
    return request(app)
      .post("/user/forgot-password")
      .send({
        email: `inexistent@gmail.com`,
      })
      .then((response) => callbackStatusCodeError(response, 401));
  }, TIMEOUT);
});