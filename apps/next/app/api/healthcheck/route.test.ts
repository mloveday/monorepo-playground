import { GET } from "@/app/api/healthcheck/route";
import { getHealthcheckHandler } from "@repo/server/api/healthcheck/get-handler.ts";
import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@repo/server/api/healthcheck/get-handler.ts");

describe("/api/healthcheck", () => {
  const baseUrl = "http://localhost:3000/api/healthcheck";

  describe("GET", () => {
    it("should return OK response when forceSucceed is true", async () => {
      vi.mocked(getHealthcheckHandler).mockImplementation(
        async (req: URLSearchParams) =>
          Response.json({ query: req.toString() }),
      );
      const url = new URL(baseUrl);
      url.searchParams.set("foo", "bar");
      const req = new NextRequest(url);

      const response = await GET(req);

      expect(response.status).toEqual(200);
      expect(getHealthcheckHandler).toHaveBeenCalledWith(url.searchParams);
      expect(await response.json()).toEqual({
        query: url.searchParams.toString(),
      });
    });
  });
});
