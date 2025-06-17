import type { BoardThreadResponse } from "@repo/schemas/api/board/board-thread.ts";
import { boardMessageToViewModel } from "@repo/server/models/board/board-message-to-view-model.ts";
import { userToResponse } from "@repo/server/models/user/user-to-response.ts";
import type { BoardThreadWithUserAndBoardMessages } from "@repo/server/repo/board/board-thread-repo.ts";
import type { BoardMessageWithUserAndChildren } from "@repo/server/repo/board/board-message-repo.ts";

export const boardThreadToResponse = (
  bt: BoardThreadWithUserAndBoardMessages,
  allBoardMessages?: BoardMessageWithUserAndChildren[],
): BoardThreadResponse => ({
  id: bt.id,
  createdAt: bt.createdAt.toISOString(),
  updatedAt: bt.updatedAt.toISOString(),
  user: userToResponse(bt.user),
  title: bt.title,
  message: bt.message,
  boardMessages: bt.boardMessages.map((bm) =>
    boardMessageToViewModel(bm, allBoardMessages),
  ),
});
