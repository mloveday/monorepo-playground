import { faker } from "@faker-js/faker/locale/en";
import {
  getRecentSomeDataParsedResponseSchema,
  getRecentSomeDataResponseSchema,
} from "@repo/schemas/api/some-data/get-recent-some-data-response-schema.ts";
import { describe, expect, it } from "vitest";

describe("get-recent-some-data-response-schema", () => {
  describe("getRecentSomeDataResponseSchema", () => {
    it("should parse when given valid data", () => {
      const input = [
        {
          id: 42,
          message: "some message",
          createdAt: faker.date.past().toISOString(),
          updatedAt: faker.date.recent().toISOString(),
          expiresAt: null,
        },
      ];

      const result = getRecentSomeDataResponseSchema.safeParse(input);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(input);
    });

    it("should not parse when given fields incorrectly set", () => {
      const result = getRecentSomeDataResponseSchema.safeParse([
        {
          id: 42,
          massage: "this is missspelled",
          createdAt: faker.date.past().toISOString(),
          updatedAt: faker.date.recent().toISOString(),
          expiresAt: null,
        },
      ]);

      expect(result.success).toBe(false);
    });
  });

  describe("getRecentSomeDataParsedResponseSchema", () => {
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

      const result = getRecentSomeDataParsedResponseSchema.safeParse([input]);

      expect(result.success).toBe(true);
      expect(result.data).toEqual([{ ...input, createdAt, updatedAt }]);
    });

    it("should not parse when given fields incorrectly set", () => {
      const result = getRecentSomeDataParsedResponseSchema.safeParse([
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
});
