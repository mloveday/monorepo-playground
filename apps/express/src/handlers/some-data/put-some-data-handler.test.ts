import { putSomeDataHandler } from "@/src/handlers/some-data/put-some-data-handler.ts";
import { requestBuilder } from "@/test/builders/request-builder.ts";
import { responseBuilder } from "@/test/builders/response-builder.ts";
import { getPrisma } from "@repo/db";
import { buildSomeData } from "@repo/test/builders/some-data/build-some-data.ts";
import { describe, expect, it, vi } from "vitest";

describe("putSomeDataHandler", () => {
  it('should return a 200 "all good" response when request', async () => {
    const someData = buildSomeData();
    vi.mocked(getPrisma().someData.create).mockResolvedValue(someData);

    const req = requestBuilder({
      body: { message: "some-message" },
    });
    const res = responseBuilder();

    await putSomeDataHandler(req, res);

    expect(getPrisma().someData.create).toHaveBeenCalledWith({
      data: { message: "some-message" },
    });

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: someData,
    });
  });

  it("should return a 400 response when request is malformed", async () => {
    const req = requestBuilder({
      query: { count: "true" },
    });
    const res = responseBuilder();

    await putSomeDataHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringContaining(
        "Invalid input: expected object, received undefined",
      ),
      success: false,
    });
  });
});
