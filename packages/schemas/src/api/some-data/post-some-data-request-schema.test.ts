import { postSomeDataRequestSchema } from "@repo/schemas/api/some-data/post-some-data-request-schema.js";
import { describe, expect, it } from "vitest";

describe("post-some-data-request-schema", () => {
  it("should parse when given valid data and coerce dates from strings", () => {
    const expectedOutput = {
      message: "some message",
    };

    const result = postSomeDataRequestSchema.safeParse({
      ...expectedOutput,
      stripped: "property",
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual(expectedOutput);
  });

  it("should not parse when given fields incorrectly set", () => {
    const result = postSomeDataRequestSchema.safeParse({
      massage: "this is missspelled",
    });

    expect(result.success).toBe(false);
  });
});
