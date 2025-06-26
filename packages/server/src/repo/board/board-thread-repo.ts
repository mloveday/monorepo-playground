import { type Prisma, type User, getPrisma } from "@repo/db";
import type { CreateBoardThreadRequest } from "@repo/schemas/api/board/board-thread.ts";
import type { Pagination } from "@repo/schemas/api/requests/pagination-schema.ts";

const include = {
  user: true,
  boardMessages: {
    include: {
      user: true,
      childMessages: { select: { id: true } },
    },
  },
};

export type BoardThreadWithUserAndBoardMessages = Prisma.BoardThreadGetPayload<{
  include: typeof include;
}>;

export const getBoardThreads = async ({ cursor, count }: Pagination) =>
  getPrisma().boardThread.findMany({
    cursor: cursor ? { id: cursor } : undefined,
    take: count,
    include,
  });

export const getBoardThread = async (id: number) =>
  (await getPrisma().boardThread.findUnique({
    where: { id },
  })) ?? undefined;

export const createBoardThread = async (
  boardThread: CreateBoardThreadRequest,
  user: User,
): Promise<BoardThreadWithUserAndBoardMessages> => {
  const thread = await getPrisma().boardThread.create({
    data: {
      ...boardThread,
      user: { connect: user },
    },
  });
  return { ...thread, user, boardMessages: [] };
};
