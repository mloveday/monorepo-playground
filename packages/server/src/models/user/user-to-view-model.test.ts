import { userToViewModel } from "@repo/server/models/user/user-to-view-model.ts";
import { dbUserBuilder } from "@repo/server/test/builders/db/user/db-user-builder.ts";
import { describe, it } from "vitest";
import { expect } from "vitest";

describe("user-to-view-model", () => {
  it("should map a DB user to a view model", () => {
    const user = dbUserBuilder({
      sub: "some-sub",
      name: "Some Body",
      email: "somebody@example.com",
    });

    expect(userToViewModel(user)).toEqual({
      provider: "keycloak",
      sub: "some-sub",
      name: "Some Body",
    });
  });
});
