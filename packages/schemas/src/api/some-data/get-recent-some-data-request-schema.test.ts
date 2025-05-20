import {
  getRecentSomeDataRequestParsedSchema,
  getRecentSomeDataRequestSchema,
} from "@repo/schemas/api/some-data/get-recent-some-data-request-schema.js";
import { describe, expect, it } from "vitest";

describe("get-recent-some-data-request-schema", () => {
  describe("getRecentSomeDataRequestSchema", () => {
    it("should parse when given optional fields missing", () => {
      const result = getRecentSomeDataRequestSchema.safeParse({});

      expect(result.success).toBe(true);
      expect(result.data).toEqual({});
    });

    it("should parse when given optional fields present", () => {
      const result = getRecentSomeDataRequestSchema.safeParse({
        count: 0,
        cursor: 5,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ count: 0, cursor: 5 });
    });

    it("should not parse when given fields incorrectly set", () => {
      const result = getRecentSomeDataRequestSchema.safeParse({
        count: "0",
        cursor: "5",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("getRecentSomeDataRequestParsedSchema", () => {
    it("should parse when given optional fields missing and set defaults", () => {
      const result = getRecentSomeDataRequestParsedSchema.safeParse({});

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ count: 10 });
    });

    it("should parse when given optional fields present and numbers", () => {
      const result = getRecentSomeDataRequestParsedSchema.safeParse({
        count: 0,
        cursor: 5,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ count: 0, cursor: 5 });
    });

    it("should parse when given optional fields present and numeric strings", () => {
      const result = getRecentSomeDataRequestParsedSchema.safeParse({
        count: "0",
        cursor: "5",
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ count: 0, cursor: 5 });
    });

    it("should not parse when given fields incorrectly set", () => {
      const result = getRecentSomeDataRequestParsedSchema.safeParse({
        count: "not a number",
        cursor: "nor this",
      });

      expect(result.success).toBe(false);
    });
  });
});
