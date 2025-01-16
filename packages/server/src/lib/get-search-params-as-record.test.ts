import { getSearchParamsAsRecord } from "@repo/server/lib/get-search-params-as-record.ts";
import { describe, expect, it } from "vitest";

describe("getSearchParamsAsRecord", () => {
  it("should return search params as a record of key-value strings", () => {
    const params = new URLSearchParams();
    params.set("alpha", "some string");
    params.set("numeric", "42");
    params.set("boolean", "true");

    expect(getSearchParamsAsRecord(params)).toEqual({
      alpha: "some string",
      numeric: "42",
      boolean: "true",
    });
  });
});
