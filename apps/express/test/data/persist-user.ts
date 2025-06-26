import { type User, getPrisma } from "@repo/db";

export const persistUser = (overrides?: {
  sub?: string;
  name?: string;
  email?: string;
}): Promise<User> =>
  getPrisma().user.create({
    data: {
      sub: "some-sub",
      name: "Some Person",
      email: "someone@example.com",
      ...overrides,
    },
  });
