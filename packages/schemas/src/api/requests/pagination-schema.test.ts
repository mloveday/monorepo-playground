import { faker } from "@faker-js/faker/locale/en";
import {} from "@repo/schemas/api/board/board-thread.ts";
import { paginationSchema } from "@repo/schemas/api/requests/pagination-schema.ts";
import { describe, expect, it } from "vitest";

describe("pagination schema", () => {
  it("should parse valid data", () => {
    const data = {
      count: faker.number.int(),
      cursor: faker.number.int(),
    };

    expect(paginationSchema.parse(data)).toEqual(data);
  });
});
