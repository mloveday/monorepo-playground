import { describe, expect, it } from "vitest";
import {} from "@repo/schemas/api/board/board-thread.ts";
import { faker } from "@faker-js/faker/locale/en";
import { userSchema } from "@repo/schemas/api/user/user-schema.ts";

describe("user schema", () => {
  it("should parse valid data", () => {
    const data = {
      sub: faker.string.uuid(),
      name: faker.person.fullName(),
      provider: "keycloak",
    };

    expect(userSchema.parse(data)).toEqual(data);
  });
});
