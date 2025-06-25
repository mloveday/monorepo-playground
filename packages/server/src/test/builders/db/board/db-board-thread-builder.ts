import { dbTimestamps } from "@repo/server/test/builders/db/db-timestamps.ts";
import { idInteger } from "@repo/server/test/builders/db/id-integer.ts";
import { faker } from "@faker-js/faker/locale/en";
import type { BoardThread } from "@repo/db";

export const dbBoardThreadBuilder = (
  overrides?: Partial<BoardThread>,
): BoardThread => ({
  ...dbTimestamps(),
  ...idInteger(),
  title: faker.lorem.sentence(),
  message: faker.lorem.sentence(),
  userSub: faker.string.uuid(),
  ...overrides,
});
