import { faker } from "@faker-js/faker/locale/en";
import type { BoardThreadWithUserAndBoardMessages } from "@repo/server/repo/board/board-thread-repo.ts";
import { dbBoardThreadBuilder } from "@repo/server/test/builders/db/board/db-board-thread-builder.ts";

export const dbBoardThreadWithUserAndBoardMessagesBuilder = (
  overrides?: Partial<BoardThreadWithUserAndBoardMessages>,
): BoardThreadWithUserAndBoardMessages => ({
  ...dbBoardThreadBuilder(),
  user: {
    sub: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  },
  boardMessages: [],
  ...overrides,
});
