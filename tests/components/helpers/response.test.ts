import * as express from "express";
import * as request from "supertest";
import { BaseError } from "ts-framework-common";
import response from "../../../lib/components/helpers/response";
import { HttpError } from "../../../lib";

describe("lib.server.helpers.response", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use((req, res, next) => {
      res.error = response.error(res);
      res.success = response.success(res);
      next();
    });
  });

  it("should send successful responses", async () => {
    expect.assertions(2);

    function circular() {
      this.payload = "test";
      this.circular = this;
    }

    app.get("/empty", (req, res) => res.success());
    app.get("/test", (req, res) => res.success({ test: "ok" }));
    app.get("/tests", (req, res) => res.success([{ test: "ok" }, { toJSON: () => ({ test: "ok" }) }]));
    app.get("/circular-test", (req, res) => res.success(new circular()));

    // Perform a simple empty request to get a 200 response
    await request(app)
      .get("/empty")
      .expect("Content-Type", /json/)
      .expect(200, {});

    // Perform a simple request to get a 200 response
    await request(app)
      .get("/test")
      .expect("Content-Type", /json/)
      .expect(200, { test: "ok" });

    // Perform a simple array request to get a 200 response
    await request(app)
      .get("/tests")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => expect(response.body).toHaveProperty("length", 2));

    // Perform a request to get a 200 response with a circular reference
    await request(app)
      .get("/circular-test")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => expect(response.body).toHaveProperty("payload", "test"));
  });

  it("should send error responses", async () => {
    expect.assertions(6);

    app.get("/string", (req, res) => res.error("Test error"));
    app.get("/baseError", (req, res) => res.error(new BaseError("Base test error")));
    app.get("/httpError", (req, res) => res.error(new HttpError("Http test error", 400)));

    // Perform a simple empty request to get a 200 response
    await request(app)
      .get("/string")
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response: any) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toMatch(/Test error/);
      });

    // Perform a simple request to get a 200 response
    await request(app)
      .get("/baseError")
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response: any) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toMatch(/Base test error/);
      });

    // Perform a simple array request to get a 200 response
    await request(app)
      .get("/httpError")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response: any) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toMatch(/Http test error/);
      });
  });
});
