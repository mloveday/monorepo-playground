import type { BoardMessage } from "@repo/db";
import { dbTimestamps } from "@repo/server/test/builders/db/db-timestamps.ts";
import { faker } from "@faker-js/faker/locale/en";
import { idInteger } from "@repo/server/test/builders/db/id-integer.ts";

export const dbBoardMessageBuilder = (
  overrides?: Partial<BoardMessage>,
): BoardMessage => ({
  ...dbTimestamps(),
  ...idInteger(),
  message: faker.lorem.sentence(),
  userSub: faker.string.uuid(),
  boardThreadId: faker.number.int(),
  parentMessageId: faker.helpers.arrayElement([null, faker.number.int()]),
  ...overrides,
});
