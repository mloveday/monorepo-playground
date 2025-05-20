import { faker } from "@faker-js/faker/locale/en";
import {
  someDataParsedSchema,
  someDataSchema,
  someDataSerializedSchema,
} from "@repo/schemas/api/some-data/some-data-schema.js";
import { describe, expect, it } from "vitest";

describe("some-data-schema", () => {
  describe("someDataSchema", () => {
    it("should parse when given valid data", () => {
      const input = {
        id: 42,
        message: "some message",
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        expiresAt: null,
      };

      const result = someDataSchema.safeParse(input);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(input);
    });

    it("should not parse when given fields incorrectly set", () => {
      const result = someDataSchema.safeParse({
        id: 42,
        massage: "this is missspelled",
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        expiresAt: null,
      });

      expect(result.success).toBe(false);
    });
  });

  describe("someDataSerializedSchema", () => {
    it("should parse when given valid data and coerce dates from strings", () => {
      const input = {
        id: 42,
        message: "some message",
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        expiresAt: null,
      };

      const result = someDataSerializedSchema.safeParse(input);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(input);
    });

    it("should not parse when given fields incorrectly set", () => {
      const result = someDataSerializedSchema.safeParse([
        {
          id: 42,
          massage: "this is missspelled",
          createdAt: "not a date",
          updatedAt: faker.date.recent().toISOString(),
          expiresAt: null,
        },
      ]);

      expect(result.success).toBe(false);
    });
  });

  describe("someDataParsedSchema", () => {
    it("should parse when given valid data and coerce dates from strings", () => {
      const createdAt = faker.date.past();
      const updatedAt = faker.date.recent();
      const input = {
        id: 42,
        message: "some message",
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        expiresAt: null,
      };

      const result = someDataParsedSchema.safeParse(input);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ ...input, createdAt, updatedAt });
    });

    it("should not parse when given fields incorrectly set", () => {
      const result = someDataParsedSchema.safeParse({
        id: 42,
        massage: "this is missspelled",
        createdAt: "not a date",
        updatedAt: faker.date.recent().toISOString(),
        expiresAt: null,
      });

      expect(result.success).toBe(false);
    });
  });
});
