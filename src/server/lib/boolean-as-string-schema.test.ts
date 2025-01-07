import { describe, expect, it } from "vitest";

import { booleanAsStringSchema } from "@/server/lib/boolean-as-string-schema";

describe("booleanAsStringSchema", () => {
  it('should parse "true" as true', () => {
    const result = booleanAsStringSchema.safeParse("true");

    expect(result.success).toBe(true);
    expect(result.success && result.data).toBe(true);
  });

  it('should parse "false" as false', () => {
    const result = booleanAsStringSchema.safeParse("false");

    expect(result.success).toBe(true);
    expect(result.success && result.data).toBe(false);
  });

  it.each([1, {}, "T", true, 0, undefined, null, "F", false])(
    "should fail to parse %s",
    (v) => {
      const result = booleanAsStringSchema.safeParse(v);

      expect(result.success).toBe(false);
    },
  );
});
