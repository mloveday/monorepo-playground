import { userToResponse } from "@repo/server/models/user/user-to-response.ts";
import type { BoardMessageWithUserAndChildren } from "@repo/server/repo/board/board-message-repo.ts";
import { isDefined } from "@repo/lib/equality-checks.ts";
import type { BoardMessageResponse } from "@repo/schemas/api/board/board-message.ts";

export const boardMessageToViewModel = (
  bm: BoardMessageWithUserAndChildren,
  allMessages?: BoardMessageWithUserAndChildren[],
): BoardMessageResponse => ({
  id: bm.id,
  createdAt: bm.createdAt.toISOString(),
  updatedAt: bm.updatedAt.toISOString(),
  user: userToResponse(bm.user),
  childMessages: bm.childMessages
    .map((cm) => {
      const message = allMessages?.find((m) => m.id === cm.id);
      return message
        ? boardMessageToViewModel(message, allMessages)
        : undefined;
    })
    .filter(isDefined),
  parentMessageId: bm.parentMessageId ?? undefined,
  boardThreadId: bm.boardThreadId,
  message: bm.message,
});
