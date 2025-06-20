import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "@/src/app.ts";
import { bearerTokenBuilder } from "@/test/builders/bearer-token-builder.ts";

describe("GET /api/healthcheck", () => {
  it('should return a 200 "all good" response when anonymous and forceSucceed is true', async () => {
    const response = await supertest(app)
      .get("/api/healthcheck?forceSucceed=true")
      .expect(200);

    expect(response.body).toEqual({
      message: "All good",
      success: true,
    });
  });

  it("should return a 400 response when anonymous and request is malformed", async () => {
    const response = await supertest(app)
      .get("/api/healthcheck?forceSuckSeed=true")
      .expect(400);

    expect(response.body).toEqual({
      message: "Bad request",
      success: false,
    });
  });

  it('should return a 200 "Bad request" response when anonymous and forceSucceed is false', async () => {
    const response = await supertest(app)
      .get("/api/healthcheck?forceSucceed=false")
      .expect(200);

    expect(response.body).toEqual({
      message: "Nope",
      success: false,
    });
  });

  it('should return a 200 "all good" response when anonymous and forceSucceed is true', async () => {
    const sub = "some-sub";
    const response = await supertest(app)
      .get("/api/healthcheck?forceSucceed=true")
      .set("Authorization", `Bearer ${bearerTokenBuilder({ sub })}`)
      .expect(200);

    expect(response.body).toEqual({
      message: "All good",
      success: true,
      sub,
    });
  });

  it("should return a 400 response when anonymous and request is malformed", async () => {
    const sub = "some-sub";
    const response = await supertest(app)
      .get("/api/healthcheck?forceSuckSeed=true")
      .set("Authorization", `Bearer ${bearerTokenBuilder({ sub })}`)
      .expect(400);

    expect(response.body).toEqual({
      message: "Bad request",
      success: false,
      sub,
    });
  });

  it('should return a 200 "Bad request" response when anonymous and forceSucceed is false', async () => {
    const sub = "some-sub";
    const response = await supertest(app)
      .get("/api/healthcheck?forceSucceed=false")
      .set("Authorization", `Bearer ${bearerTokenBuilder({ sub })}`)
      .expect(200);

    expect(response.body).toEqual({
      message: "Nope",
      success: false,
      sub,
    });
  });

  it("should return a 200 when optional user authentication is not a JWT", async () => {
    const response = await supertest(app)
      .get("/api/healthcheck?forceSucceed=true")
      .set("Authorization", "Bearer not-a-token")
      .expect(200);

    expect(response.body).toEqual({
      message: "All good",
      success: true,
    });
  });
});
