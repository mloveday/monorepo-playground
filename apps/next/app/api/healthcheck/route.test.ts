import { GET } from "@/app/api/healthcheck/route";
import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

describe("/api/healthcheck", () => {
  const baseUrl = "http://localhost:3000/api/healthcheck";

  describe("GET", () => {
    vi.mock("@repo/server/api/healthcheck/get-handler.ts", () => ({
      getHealthcheckHandler: (req: Request) => Response.json({ url: req.url }),
    }));

    it("should return OK response when forceSucceed is true", async () => {
      const req = new NextRequest(new URL(baseUrl));

      const response = await GET(req);

      expect(response.status).toEqual(200);
      expect(await response.json()).toEqual({ url: baseUrl });
    });
  });
});
