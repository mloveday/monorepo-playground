import {
  type BoardMessage,
  type BoardThread,
  type User,
  getPrisma,
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
