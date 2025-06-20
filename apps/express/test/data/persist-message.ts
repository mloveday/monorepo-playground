import {
  type BoardMessage,
  type BoardThread,
  getPrisma,
  type User,
} from "@repo/db";

export const persistMessage = (
  thread: BoardThread,
  user: User,
  overrides?: { parentMessage?: BoardMessage; message?: string },
): Promise<BoardMessage> =>
  getPrisma().boardMessage.create({
    data: {
      message: overrides?.message ?? "parent message",
      parentMessage: overrides?.parentMessage
        ? { connect: overrides.parentMessage }
        : undefined,
      boardThread: { connect: thread },
      user: { connect: user },
    },
  });
