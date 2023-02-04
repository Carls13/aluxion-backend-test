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

describe("POST /user should", () => {
  it("send 400 when no body is sent", () => {
    return request(app)
      .post("/user/")
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

  it("send 201 when registering user successfully", () => {
    return request(app)
      .post("/user/")
      .send({
        email: `test${Math.random() * 10}@gmail.com`,
        username: `test${Math.random() * 10}`,
        password: 'whatever'
      })
      .then(() => callbackStatusCodeError(201));
  }, TIMEOUT);
});