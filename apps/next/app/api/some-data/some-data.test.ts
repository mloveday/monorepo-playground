import { GET } from "@/app/api/some-data/route.ts";
import { findMostRecentlyCreatedSomeData } from "@repo/server/repo/some-data/some-data-repo.ts";
import { buildSomeData } from "@repo/server/test/builders/some-data/build-some-data.ts";
import { NextRequest } from "next/server.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@repo/server/repo/some-data/some-data-repo.ts");

describe("/some-data", () => {
  const baseUrl = "http://localhost:3001/api/some-data";

  beforeEach(() => {
    vi.mocked(findMostRecentlyCreatedSomeData).mockImplementation(
      async (count, cursor = 0) =>
        Array.from({ length: count }).map((_, i) =>
          buildSomeData({ id: cursor + i }),
        ),
    );
  });

  it("should return an array of recent some data", async () => {
    const url = new URL(baseUrl);
    const req = new NextRequest(url);

    const res = await GET(req);

    expect(res.status).toEqual(200);
    const result = await res.json();
    expect(result).toHaveLength(10);
    expect(result[0].id).toBe(0);
    expect(findMostRecentlyCreatedSomeData).toHaveBeenCalledWith(10, undefined);
  });

  it("should return an array of desired length of recent some data", async () => {
    const url = new URL(baseUrl);
    url.searchParams.set("count", "11");
    const req = new NextRequest(url);

    const res = await GET(req);

    expect(res.status).toEqual(200);
    const result = await res.json();
    expect(result).toHaveLength(11);
    expect(result[0].id).toBe(0);
    expect(findMostRecentlyCreatedSomeData).toHaveBeenCalledWith(11, undefined);
  });

  it("should return an array of recent some data from the given cursor", async () => {
    const url = new URL(baseUrl);
    url.searchParams.set("count", "11");
    url.searchParams.set("cursor", "17");
    const req = new NextRequest(url);

    const res = await GET(req);

    expect(res.status).toEqual(200);
    const result = await res.json();
    expect(result).toHaveLength(11);
    expect(result[0].id).toBe(17);
    expect(findMostRecentlyCreatedSomeData).toHaveBeenCalledWith(11, 17);
  });
});
