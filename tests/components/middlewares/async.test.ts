import * as request from "supertest";
import Server from "../../../lib";
import { Logger } from "ts-framework-common";

describe("lib.server.middlewares.Async", () => {
  Logger.initialize();

  it("should not wrap a number", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      router: {
        routes: {
          get: { "/": 1 }
        }
      } as any
    });

    // Perform a simple request to get a 200 response
    await request(server.app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(500, /Async middleware cannot wrap something that is not a function/);

    await server.close();
  });

  it("should not wrap a string", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      router: {
        routes: {
          get: { "/": "blah" }
        }
      }
    });

    // Perform a simple request to get a 500 response
    await request(server.app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(500, /Async middleware cannot wrap something that is not a function/);

    await server.close();
  });

  it("should wrap a valid function", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      router: {
        routes: {
          get: { "/": async (req, res) => res.success({ test: "ok" }) }
        }
      }
    });

    // Perform a simple request to get a 200 response
    await request(server.app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200, { test: "ok" });

    await server.close();
  });
});
