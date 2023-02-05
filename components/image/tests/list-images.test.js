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

describe("GET /image should", () => {
  it("send 400 when no search is sent", () => {
    return request(app)
      .get("/image")
      .then((response) => callbackStatusCodeError(response, 400));
  }, TIMEOUT);

  it("send 200 when sending correct params", () => {
    return request(app)
      .get("/image?page=1&limit=10&search=cat")
      .then((response) => callbackStatusCodeError(response, 200));
  }, TIMEOUT);

  it("send 15 images when requesting 15 elements", () => {
    return request(app)
    .get("/image?page=1&limit=10&search=cat")
    .then((response) =>{
        expect(response.data.body.images).toHaveLength(15);
    });
  }, TIMEOUT);
});