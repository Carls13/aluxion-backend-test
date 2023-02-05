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

describe("GET /image/bucket should", () => {
  it("send 200 when sending correct info", () => {
    return request(app)
      .get("/image/bucket/")
      .then((response) => callbackStatusCodeError(response, 200));
  }, TIMEOUT);

  it("send images from bucket", () => {
    return request(app)
    .get("/image/bucket/")
    .then((response) =>{
        expect(response.data.body).toHaveKey('images');
    });
  }, TIMEOUT);
});