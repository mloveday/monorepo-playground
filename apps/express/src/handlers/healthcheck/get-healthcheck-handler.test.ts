import { getHealthcheckHandler } from "@/src/handlers/healthcheck/get-healthcheck-handler.ts";
import { requestBuilder } from "@/test/builders/request-builder.ts";
import { responseBuilder } from "@/test/builders/response-builder.ts";
import { describe, expect, it } from "vitest";

describe("getHealthcheckHandler", () => {
  it('should return a 200 "all good" response when forceSucceed is true', async () => {
    const req = requestBuilder({
      query: { forceSucceed: "true" },
    });
    const res = responseBuilder();

    await getHealthcheckHandler(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "All good",
      success: true,
    });
  });

  it("should return a 400 response when request is malformed", async () => {
    const req = requestBuilder({
      query: { forceSuckSeed: "true" },
    });
    const res = responseBuilder();

    await getHealthcheckHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Bad request",
      success: false,
    });
  });

  it('should return a 200 "Bad request" response when forceSucceed is false', async () => {
    const req = requestBuilder({
      query: { forceSucceed: "false" },
    });
    const res = responseBuilder();

    await getHealthcheckHandler(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: "Nope",
      success: false,
    });
  });
});
