import { faker } from "@faker-js/faker/locale/en";
import {} from "@repo/schemas/api/board/board-thread.ts";
import { userViewModel } from "@repo/schemas/api/user/user-view-model.ts";
import { describe, expect, it } from "vitest";

describe("user schema", () => {
  it("should parse valid data", () => {
    const data = {
      sub: faker.string.uuid(),
      name: faker.person.fullName(),
      provider: "keycloak",
    };

    expect(userViewModel.parse(data)).toEqual(data);
  });
});
