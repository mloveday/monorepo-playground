import { faker } from "@faker-js/faker/locale/en";
import {
  dbTimestampsParsedSchema,
  dbTimestampsSchema,
  dbTimestampsSerializedSchema,
} from "@repo/schemas/db/db-timestamps-schema.ts";
import { describe, expect, it } from "vitest";

describe("db-timestamps-schema", () => {
  describe("dbTimestampsSchema", () => {
    it("should parse when given valid dates", () => {
      const input = {
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        expiresAt: null,
      };

      const result = dbTimestampsSchema.safeParse(input);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(input);
    });

    it("should not parse when given strings", () => {
      const result = dbTimestampsSchema.safeParse({
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        expiresAt: null,
      });

      expect(result.success).toBe(false);
    });
  });

  describe("dbTimestampsSerializedSchema", () => {
    it("should parse when given valid dates as strings", () => {
      const input = {
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        expiresAt: null,
      };

      const result = dbTimestampsSerializedSchema.safeParse(input);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(input);
    });

    it("should not parse when given invalid dates as strings", () => {
      const result = dbTimestampsSerializedSchema.safeParse([
        {
          createdAt: "not a date",
          updatedAt: faker.date.recent().toISOString(),
          expiresAt: null,
        },
      ]);

      expect(result.success).toBe(false);
    });
  });

  describe("dbTimestampsParsedSchema", () => {
    it("should parse when given valid dates as strings", () => {
      const createdAt = faker.date.past();
      const updatedAt = faker.date.recent();
      const input = {
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        expiresAt: null,
      };

      const result = dbTimestampsParsedSchema.safeParse(input);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ ...input, createdAt, updatedAt });
    });

    it("should not parse when given invalid dates as strings", () => {
      const result = dbTimestampsParsedSchema.safeParse({
        createdAt: "not a date",
        updatedAt: faker.date.recent().toISOString(),
        expiresAt: null,
      });

      expect(result.success).toBe(false);
    });
  });
});
