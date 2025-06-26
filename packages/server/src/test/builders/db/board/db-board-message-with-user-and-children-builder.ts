import type { BoardMessageWithUserAndChildren } from "@repo/server/repo/board/board-message-repo.ts";
import { dbBoardMessageBuilder } from "@repo/server/test/builders/db/board/db-board-message-builder.ts";
import { dbUserBuilder } from "@repo/server/test/builders/db/user/db-user-builder.ts";

export const dbBoardMessageWithUserAndChildrenBuilder = (
  overrides?: Partial<BoardMessageWithUserAndChildren>,
): BoardMessageWithUserAndChildren => ({
  ...dbBoardMessageBuilder(),
  user: dbUserBuilder(),
  childMessages: [],
  ...overrides,
});
