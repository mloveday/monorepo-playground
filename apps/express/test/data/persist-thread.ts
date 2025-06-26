import { type BoardThread, type User, getPrisma } from "@repo/db";

export const persistThread = (
  user: User,
  overrides?: { title?: string; message?: string },
): Promise<BoardThread> =>
  getPrisma().boardThread.create({
    data: {
      title: "some thread",
      message: "some content",
      ...overrides,
      user: { connect: user },
    },
  });
