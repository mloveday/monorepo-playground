import { faker } from "@faker-js/faker/locale/en";
import {} from "@repo/schemas/api/board/board-thread.ts";
import { userSchema } from "@repo/schemas/api/user/user-schema.ts";
import { describe, expect, it } from "vitest";

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
