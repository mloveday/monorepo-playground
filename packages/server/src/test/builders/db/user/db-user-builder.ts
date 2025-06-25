import { faker } from "@faker-js/faker/locale/en";
import type { User } from "@repo/db";

export const dbUserBuilder = (overrides?: Partial<User>): User => ({
  sub: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  ...overrides,
});
