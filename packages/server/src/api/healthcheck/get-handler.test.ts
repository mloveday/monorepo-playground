import { getHealthcheckHandlerFactory } from "@repo/server/api/healthcheck/get-handler.ts";
import { describe, expect, it, vi } from "vitest";

describe("GET healthcheck handler", () => {
  const baseUrl = "http://localhost:3001/api/healthcheck";

  // we don't want to wait 1000ms in tests - mock this to resolve immediately
  const wait = vi.fn().mockResolvedValue(undefined);

  it("should return OK response when forceSucceed is true", async () => {
    const url = new URL(baseUrl);
    url.searchParams.set("forceSucceed", "true");
    const handler = getHealthcheckHandlerFactory({ wait });

    const response = await handler(url.searchParams);

    expect(wait).toHaveBeenCalledOnce();
    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual({
      success: true,
      message: "All good",
    });
  });

  it("should return NOPE response when forceSucceed is true", async () => {
    const url = new URL(baseUrl);
    url.searchParams.set("forceSucceed", "false");
    const handler = getHealthcheckHandlerFactory({ wait });

    const response = await handler(url.searchParams);

    expect(wait).toHaveBeenCalledOnce();
    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual({
      success: false,
      message: "Nope",
    });
  });

  it("should return 400 & BAD_RESPONSE response when request is poorly formed", async () => {
    const handler = getHealthcheckHandlerFactory({ wait });

    const response = await handler(new URL(baseUrl).searchParams);

    expect(wait).toHaveBeenCalledOnce();
    expect(response.status).toEqual(400);
    expect(await response.json()).toEqual({
      success: false,
      message: "Bad request",
    });
  });
});
