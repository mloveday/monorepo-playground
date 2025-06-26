import { faker } from "@faker-js/faker/locale/en";
import { getPrisma } from "@repo/db";
import { getOrCreateUser } from "@repo/server/repo/user/user-repo.ts";
import { describe, expect, it, vi } from "vitest";

describe("user-repo", () => {
  it("should return existing user", async () => {
    const user = {
      sub: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      provider: "keycloak",
    };

    vi.mocked(getPrisma().user.findUnique).mockResolvedValue(user);

    expect(await getOrCreateUser(user)).toEqual(user);
    expect(getPrisma().user.create).not.toHaveBeenCalled();
  });

  it("should create and return user if sub does not exist", async () => {
    const user = {
      sub: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      provider: "keycloak",
    };

    vi.mocked(getPrisma().user.findUnique).mockResolvedValue(null);
    vi.mocked(getPrisma().user.create).mockResolvedValue(user);

    expect(await getOrCreateUser(user)).toEqual(user);
    expect(getPrisma().user.create).toHaveBeenCalledWith({
      data: {
        sub: user.sub,
        name: user.name,
        email: user.email,
      },
    });
  });
});
