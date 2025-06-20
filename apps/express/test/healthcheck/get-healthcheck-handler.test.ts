import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "@/src/app.ts";

describe("getHealthcheckHandler", () => {
  it('should return a 200 "all good" response when forceSucceed is true', async () => {
    const response = await supertest(app)
      .get("/api/healthcheck?forceSucceed=true")
      .expect(200);

    expect(response.body).toEqual({
      message: "All good",
      success: true,
    });
  });

  it("should return a 400 response when request is malformed", async () => {
    const response = await supertest(app)
      .get("/api/healthcheck?forceSuckSeed=true")
      .expect(400);

    expect(response.body).toEqual({
      message: "Bad request",
      success: false,
    });
  });

  it('should return a 200 "Bad request" response when forceSucceed is false', async () => {
    const response = await supertest(app)
      .get("/api/healthcheck?forceSucceed=false")
      .expect(200);

    expect(response.body).toEqual({
      message: "Nope",
      success: false,
    });
  });
});
