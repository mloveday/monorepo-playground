import { boardMessageToViewModel } from "@repo/server/models/board/board-message-to-view-model.ts";
import { userToViewModel } from "@repo/server/models/user/user-to-view-model.ts";
import { dbBoardMessageWithUserAndChildrenBuilder } from "@repo/server/test/builders/db/board/db-board-message-with-user-and-children-builder.ts";
import { describe, expect, it } from "vitest";

describe("board-message-to-view-model", () => {
  it("should map top-level message", () => {
    const message = dbBoardMessageWithUserAndChildrenBuilder({
      parentMessageId: null,
    });

    expect(boardMessageToViewModel(message)).toEqual({
      id: message.id,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
      user: userToViewModel(message.user),
      message: message.message,
      childMessages: [],
      boardThreadId: message.boardThreadId,
    });
  });

  it("should map top-level message", () => {
    const message = dbBoardMessageWithUserAndChildrenBuilder({
      parentMessageId: 42,
    });

    expect(boardMessageToViewModel(message)).toEqual({
      id: message.id,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
      user: userToViewModel(message.user),
      message: message.message,
      childMessages: [],
      parentMessageId: message.parentMessageId,
      boardThreadId: message.boardThreadId,
    });
  });

  it("should map nested child messages", () => {
    const message = dbBoardMessageWithUserAndChildrenBuilder({
      parentMessageId: 42,
      message: "top-level",
    });
    const childOneDeep = dbBoardMessageWithUserAndChildrenBuilder({
      parentMessageId: message.id,
      message: "one deep",
    });
    const childTwoDeep = dbBoardMessageWithUserAndChildrenBuilder({
      parentMessageId: childOneDeep.id,
      message: "two deep",
    });

    expect(
      boardMessageToViewModel(message, [message, childOneDeep, childTwoDeep]),
    ).toEqual({
      id: message.id,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
      user: userToViewModel(message.user),
      message: message.message,
      childMessages: [
        {
          id: childOneDeep.id,
          createdAt: childOneDeep.createdAt.toISOString(),
          updatedAt: childOneDeep.updatedAt.toISOString(),
          user: userToViewModel(childOneDeep.user),
          message: childOneDeep.message,
          childMessages: [
            {
              id: childTwoDeep.id,
              createdAt: childTwoDeep.createdAt.toISOString(),
              updatedAt: childTwoDeep.updatedAt.toISOString(),
              user: userToViewModel(childTwoDeep.user),
              message: childTwoDeep.message,
              childMessages: [],
              parentMessageId: childTwoDeep.parentMessageId,
              boardThreadId: childTwoDeep.boardThreadId,
            },
          ],
          parentMessageId: childOneDeep.parentMessageId,
          boardThreadId: childOneDeep.boardThreadId,
        },
      ],
      parentMessageId: message.parentMessageId,
      boardThreadId: message.boardThreadId,
    });
  });
});
