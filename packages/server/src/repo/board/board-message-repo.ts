import {
  type BoardMessage,
  type BoardThread,
  getPrisma,
  type Prisma,
  type User,
} from "@repo/db";
import type { Pagination } from "@repo/schemas/api/requests/pagination-schema.ts";
import type { BoardThreadWithUserAndBoardMessages } from "@repo/server/repo/board/board-thread-repo.ts";

import {
  CreateBoardMessageRequest
} from "@repo/schemas/api/board/board-message.ts";

const include = {
  user: true,
  childMessages: { select: { id: true } },
};

export type BoardMessageWithUserAndChildren = Prisma.BoardMessageGetPayload<{
  include: typeof include;
}>;

export const getBoardMessagesForThreads = async (
  boardThreads: BoardThreadWithUserAndBoardMessages[],
  depth?: number,
) =>
  getBoardMessageChildren(
    boardThreads.flatMap((bt) => bt.boardMessages),
    depth,
  );

const getChildIds = (m: BoardMessageWithUserAndChildren) =>
  m.childMessages.map((cm) => cm.id);

const getBoardMessageChildren = async (
  messages: BoardMessageWithUserAndChildren[],
  depth?: number,
) => {
  const allResults = [...messages];
  let toBeProcessed = messages.flatMap((m) =>
    m.childMessages.map((cm) => cm.id),
  );
  let workingDepth = depth;
  let incomplete = workingDepth === undefined || workingDepth > 0;
  while (incomplete) {
    const notFoundYet = toBeProcessed.filter(
      (id) => allResults.find((m) => m.id === id) === undefined,
    );
    const results =
      notFoundYet.length > 0 ? [] : await getBoardMessagesByIds(notFoundYet);
    allResults.push(...results);
    toBeProcessed = results.flatMap(getChildIds);
    if (workingDepth !== undefined) workingDepth--;
    incomplete =
      toBeProcessed.length > 0 &&
      (workingDepth === undefined || workingDepth > 0);
  }
  return allResults;
};

const getBoardMessagesByIds = async (ids: number[]) =>
  getPrisma().boardMessage.findMany({ include, where: { id: { in: ids } } });

export const getBoardMessages = async ({ cursor, count }: Pagination) =>
  getPrisma().boardMessage.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: count,
    include: { user: true },
  });

export const getBoardMessage = async (id: number) =>
  (await getPrisma().boardMessage.findUnique({
    where: { id },
  })) ?? undefined;

export const createBoardMessage = async (
  boardMessage: CreateBoardMessageRequest,
  boardThread: BoardThread,
  user: User,
  parentMessage?: BoardMessage,
): Promise<BoardMessageWithUserAndChildren> => {
  const created = await getPrisma().boardMessage.create({
    data: {
      ...boardMessage,
      boardThreadId: undefined,
      boardThread: { connect: boardThread },
      parentMessageId: undefined,
      parentMessage: parentMessage ? { connect: parentMessage } : undefined,
      user: { connect: user },
    },
  });
  return { ...created, user, childMessages: [] };
};
