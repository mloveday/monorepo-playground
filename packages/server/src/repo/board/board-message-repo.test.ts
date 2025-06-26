import { describe, expect, it, vi } from "vitest";
import {
  createBoardMessage,
  getBoardMessage,
} from "@repo/server/repo/board/board-message-repo.ts";
import { getPrisma } from "@repo/db";
import { dbBoardMessageBuilder } from "@repo/server/test/builders/db/board/db-board-message-builder.ts";
import { dbUserBuilder } from "@repo/server/test/builders/db/user/db-user-builder.ts";
import { dbBoardThreadBuilder } from "@repo/server/test/builders/db/board/db-board-thread-builder.ts";
import type { CreateBoardMessageRequest } from "@repo/schemas/api/board/board-message.ts";

describe("board-message-repo", () => {
  describe("getBoardMessage", () => {
    it("should return board message when found", async () => {
      const message = dbBoardMessageBuilder();
      vi.mocked(getPrisma().boardMessage.findUnique).mockResolvedValue(message);

      expect(await getBoardMessage(message.id)).toEqual(message);
      expect(getPrisma().boardMessage.findUnique).toHaveBeenCalledWith({
        where: { id: message.id },
      });
    });

    it("should return undefined when not found", async () => {
      vi.mocked(getPrisma().boardMessage.findUnique).mockResolvedValue(null);

      expect(await getBoardMessage(42)).toBeUndefined();
      expect(getPrisma().boardMessage.findUnique).toHaveBeenCalledWith({
        where: { id: 42 },
      });
    });
  });

  describe("createBoardMessage", () => {
    it("should persist a message without parent and return response additional properties", async () => {
      const user = dbUserBuilder();
      const thread = dbBoardThreadBuilder();
      const boardMessage = dbBoardMessageBuilder({
        userSub: user.sub,
        boardThreadId: thread.id,
      });
      vi.mocked(getPrisma().boardMessage.create).mockResolvedValue(
        boardMessage,
      );
      const request = {
        message: boardMessage.message,
        boardThreadId: boardMessage.boardThreadId,
      } satisfies CreateBoardMessageRequest;

      expect(await createBoardMessage(request, thread, user)).toEqual({
        ...boardMessage,
        user,
        childMessages: [],
      });

      expect(getPrisma().boardMessage.create).toHaveBeenCalledWith({
        data: {
          message: boardMessage.message,
          boardThread: { connect: thread },
          user: { connect: user },
        },
      });
    });

    it("should persist a message with parent and return response additional properties", async () => {
      const user = dbUserBuilder();
      const thread = dbBoardThreadBuilder();
      const parentMessage = dbBoardMessageBuilder({
        boardThreadId: thread.id,
      });
      const boardMessage = dbBoardMessageBuilder({
        boardThreadId: thread.id,
      });
      vi.mocked(getPrisma().boardMessage.create).mockResolvedValue(
        boardMessage,
      );
      const request = {
        message: boardMessage.message,
        boardThreadId: boardMessage.boardThreadId,
        parentMessageId: parentMessage.id,
      } satisfies CreateBoardMessageRequest;

      expect(
        await createBoardMessage(request, thread, user, parentMessage),
      ).toEqual({
        ...boardMessage,
        user,
        childMessages: [],
      });

      expect(getPrisma().boardMessage.create).toHaveBeenCalledWith({
        data: {
          message: boardMessage.message,
          boardThread: { connect: thread },
          parentMessage: { connect: parentMessage },
          user: { connect: user },
        },
      });
    });
  });
});
