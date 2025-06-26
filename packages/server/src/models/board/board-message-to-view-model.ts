import type { BoardMessageResponse } from "@repo/schemas/api/board/board-message.ts";
import { userToResponse } from "@repo/server/models/user/user-to-response.ts";
import type { BoardMessageWithUserAndChildren } from "@repo/server/repo/board/board-message-repo.ts";

export const boardMessageToViewModel = (
  bm: BoardMessageWithUserAndChildren,
  allMessages?: BoardMessageWithUserAndChildren[],
): BoardMessageResponse => ({
  id: bm.id,
  createdAt: bm.createdAt.toISOString(),
  updatedAt: bm.updatedAt.toISOString(),
  user: userToResponse(bm.user),
  childMessages: (allMessages ?? [])
    .filter((cm) => cm.parentMessageId === bm.id)
    .map((cm) => {
      return boardMessageToViewModel(cm, allMessages);
    }),
  parentMessageId: bm.parentMessageId ?? undefined,
  boardThreadId: bm.boardThreadId,
  message: bm.message,
});
