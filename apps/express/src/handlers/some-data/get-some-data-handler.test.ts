import { getSomeDataHandler } from "@/src/handlers/some-data/get-some-data-handler.js";
import { requestBuilder } from "@/test/builders/request-builder.js";
import { responseBuilder } from "@/test/builders/response-builder.js";
import { Prisma, getPrisma } from "@repo/db";
import { describe, expect, it, vi } from "vitest";
import { ZodError } from "zod/v4";

describe("getSomeDataHandler", () => {
  it('should return a 200 "all good" response when request', async () => {
    const someData = ["some", "data"];
    const findMany = vi.fn(() => someData);
    vi.mocked(getPrisma).mockReturnValue({ someData: { findMany } });

    const req = requestBuilder({
      query: { forceSucceed: "true" },
    });
    const res = responseBuilder();

    await getSomeDataHandler(req, res);

    expect(findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: Prisma.SortOrder.desc },
      cursor: undefined,
      take: 10,
    });

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(someData);
  });

  it("should return a 400 response when request is malformed", async () => {
    const req = requestBuilder({
      query: { count: "true" },
    });
    const res = responseBuilder();

    await getSomeDataHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(ZodError),
      success: false,
    });
  });
});
