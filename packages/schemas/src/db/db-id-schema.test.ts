import { dbIdSchema } from "@repo/schemas/db/db-id-schema.ts";
import { describe, expect, it } from "vitest";

describe("db-id-schema", () => {
  it("should should parse with a valid id", () => {
    const input = { id: 5 };

    const result = dbIdSchema.safeParse(input);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(input);
  });

  it("should should not parse with an invalid id", () => {
    const input = { id: "5" };

    const result = dbIdSchema.safeParse(input);

    expect(result.success).toBe(false);
  });
});
