import type { BoardThreadViewModel } from "@repo/schemas/api/board/board-thread.ts";
import { boardMessageToViewModel } from "@repo/server/models/board/board-message-to-view-model.ts";
import { userToViewModel } from "@repo/server/models/user/user-to-view-model.ts";
import type { BoardThreadWithUserAndBoardMessages } from "@repo/server/repo/board/board-thread-repo.ts";

export const boardThreadToViewModel = (
  bt: BoardThreadWithUserAndBoardMessages,
): BoardThreadViewModel => ({
  id: bt.id,
  createdAt: bt.createdAt.toISOString(),
  updatedAt: bt.updatedAt.toISOString(),
  user: userToViewModel(bt.user),
  title: bt.title,
  message: bt.message,
  boardMessages: bt.boardMessages
    .filter((bm) => bm.parentMessageId === null)
    .map((bm) => boardMessageToViewModel(bm, bt.boardMessages)),
});
