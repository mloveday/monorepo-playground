import { faker } from "@faker-js/faker/locale/en";
import type { SomeData } from "@repo/db";
import { dbTimestamps } from "@repo/server/test/builders/db/db-timestamps.ts";
import { idInteger } from "@repo/server/test/builders/db/id-integer.ts";

export const buildSomeData = <Overrides extends Partial<SomeData>>(
  overrides: Overrides,
): Omit<SomeData, keyof Overrides> & Overrides => ({
  ...idInteger(),
  ...dbTimestamps(),
  message: faker.lorem.sentence(),
  ...overrides,
});
