import { boardThreadToViewModel } from "@repo/server/models/board/board-thread-to-view-model.ts";
import { userToResponse } from "@repo/server/models/user/user-to-response.ts";
import { dbBoardMessageWithUserAndChildrenBuilder } from "@repo/server/test/builders/db/board/db-board-message-with-user-and-children-builder.ts";
import { dbBoardThreadWithUserAndBoardMessagesBuilder } from "@repo/server/test/builders/db/board/db-board-thread-with-user-and-board-messages-builder.ts";
import { describe, expect, it } from "vitest";

describe("board-thread-to-view-model", () => {
  it("should map a DB model to a view model", () => {
    const message = dbBoardMessageWithUserAndChildrenBuilder({
      parentMessageId: null,
      message: "top-level message",
    });
    const childMessage = dbBoardMessageWithUserAndChildrenBuilder({
      parentMessageId: message.id,
      message: "child message",
    });
    const thread = dbBoardThreadWithUserAndBoardMessagesBuilder({
      boardMessages: [message, childMessage],
    });

    expect(boardThreadToViewModel(thread)).toEqual({
      id: thread.id,
      createdAt: thread.createdAt.toISOString(),
      updatedAt: thread.updatedAt.toISOString(),
      user: userToResponse(thread.user),
      title: thread.title,
      message: thread.message,
      boardMessages: [
        {
          id: message.id,
          createdAt: message.createdAt.toISOString(),
          updatedAt: message.updatedAt.toISOString(),
          user: userToResponse(message.user),
          message: message.message,
          childMessages: [
            {
              id: childMessage.id,
              createdAt: childMessage.createdAt.toISOString(),
              updatedAt: childMessage.updatedAt.toISOString(),
              user: userToResponse(childMessage.user),
              message: childMessage.message,
              childMessages: [],
              parentMessageId: childMessage.parentMessageId,
              boardThreadId: childMessage.boardThreadId,
            },
          ],
          boardThreadId: message.boardThreadId,
        },
      ],
    });
  });
});
