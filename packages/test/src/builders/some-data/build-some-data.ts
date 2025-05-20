import { faker } from "@faker-js/faker/locale/en";
import type { SomeData } from "@repo/db";

export const buildSomeData = (overrides?: Partial<SomeData>) =>
  ({
    id: faker.number.int(),
    message: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    expiresAt: null,
    ...overrides,
  }) satisfies SomeData;
