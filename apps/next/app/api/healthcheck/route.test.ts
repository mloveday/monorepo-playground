import { GET } from "@/app/api/healthcheck/route";
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

describe("/api/healthcheck", () => {
  const baseUrl = "http://localhost:3000/api/healthcheck";

  describe("GET", () => {
    it("should return OK response when forceSucceed is true", async () => {
      const url = new URL(baseUrl);
      url.searchParams.set("forceSucceed", "true");
      const req = new NextRequest(url);

      const response = await GET(req);

      expect(response.status).toEqual(200);
      expect(await response.json()).toEqual({
        success: true,
        message: "All good",
      });
    });

    it("should return NOPE response when forceSucceed is true", async () => {
      const url = new URL(baseUrl);
      url.searchParams.set("forceSucceed", "false");
      const req = new NextRequest(url);

      const response = await GET(req);

      expect(response.status).toEqual(200);
      expect(await response.json()).toEqual({
        success: false,
        message: "Nope",
      });
    });

    it("should return 400 & BAD_RESPONSE response when request is poorly formed", async () => {
      const req = new NextRequest(baseUrl);

      const response = await GET(req);

      expect(response.status).toEqual(400);
      expect(await response.json()).toEqual({
        success: false,
        message: "Bad request",
      });
    });
  });
});
