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

describe("POST /user/login should", () => {
  it("send 400 when no body is sent", () => {
    return request(app)
      .post("/user/login")
      .then(() => callbackStatusCodeError(400));
  }, TIMEOUT);

  it("send 400 when sending incorrect email", () => {
    return request(app)
      .post("/user/")
      .send({
        email: "hello"
      })
      .then(() => callbackStatusCodeError(400));
  }, TIMEOUT);

  it("send 401 when sending incorrect password", () => {
    return request(app)
      .post("/user/login")
      .send({
        email: `charlesshb98@gmail.com`,
        password: 'incorrect-password'
      })
      .then(() => callbackStatusCodeError(401));
  }, TIMEOUT);
});