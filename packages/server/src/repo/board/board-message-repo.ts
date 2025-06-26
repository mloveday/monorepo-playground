import {
  type BoardMessage,
  type BoardThread,
  type Prisma,
  type User,
  getPrisma,
} from "@repo/db";
import type { CreateBoardMessageRequest } from "@repo/schemas/api/board/board-message.ts";

const include = {
  user: true,
  childMessages: { select: { id: true } },
};

export type BoardMessageWithUserAndChildren = Prisma.BoardMessageGetPayload<{
  include: typeof include;
}>;

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
      message: boardMessage.message,
      boardThread: { connect: boardThread },
      parentMessage: parentMessage ? { connect: parentMessage } : undefined,
      user: { connect: user },
    },
  });
  return { ...created, user, childMessages: [] };
};
