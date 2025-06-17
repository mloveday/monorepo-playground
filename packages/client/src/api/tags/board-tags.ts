import type { TagDescription } from "@reduxjs/toolkit/query";
import type {
  BoardMessageResponse,
  BoardThreadResponse,
} from "@repo/schemas/api/board/board-thread.ts";

export type BoardThreadTagType = "BoardThread";
export const boardThreadTagType: BoardThreadTagType = "BoardThread";
const listId = "LIST";

export const boardThreadItemTag = (
  boardThread: Pick<BoardThreadResponse, "id">,
): TagDescription<BoardThreadTagType> => ({
  id: boardThread.id,
  type: boardThreadTagType,
});

export const boardThreadListTag = {
  id: listId,
  type: boardThreadTagType,
} satisfies TagDescription<BoardThreadTagType>;

export type BoardMessageTagType = "BoardMessage";
export const boardMessageTagType: BoardMessageTagType = "BoardMessage";

export const boardMessageTagFromId = (
  id: number,
): TagDescription<BoardMessageTagType> => ({
  id,
  type: boardMessageTagType,
});

export const boardMessageItemTag = (
  boardMessage: Pick<BoardMessageResponse, "id">,
): TagDescription<BoardMessageTagType> =>
  boardMessageTagFromId(boardMessage.id);

export const boardMessageListTag = {
  id: listId,
  type: boardMessageTagType,
} satisfies TagDescription<BoardMessageTagType>;

export const getBoardMessageChildTags = (
  boardMessage: BoardMessageResponse,
): TagDescription<BoardMessageTagType>[] => [
  boardMessageItemTag(boardMessage),
  ...boardMessage.childMessages.flatMap(getBoardMessageChildTags),
];

export const getThreadBoardMessageTags = (
  boardThread: BoardThreadResponse,
): TagDescription<BoardMessageTagType>[] =>
  boardThread.boardMessages.flatMap(getBoardMessageChildTags);
