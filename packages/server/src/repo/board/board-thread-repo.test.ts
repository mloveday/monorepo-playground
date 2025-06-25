import { describe, expect, it, vi } from "vitest";
import { getPrisma } from "@repo/db";
import { dbBoardThreadWithUserAndBoardMessagesBuilder } from "@repo/server/test/builders/db/board/db-board-thread-with-user-and-board-messages-builder.ts";
import {
  createBoardThread,
  getBoardThread,
  getBoardThreads,
} from "@repo/server/repo/board/board-thread-repo.ts";
import { dbBoardThreadBuilder } from "@repo/server/test/builders/db/board/db-board-thread-builder.ts";
import { dbUserBuilder } from "@repo/server/test/builders/db/user/db-user-builder.ts";
import type { CreateBoardThreadRequest } from "@repo/schemas/api/board/board-thread.ts";
import { faker } from "@faker-js/faker/locale/en";

describe("board-thread-repo", () => {
  describe("getBoardThreads", () => {
    it("should return threads with cursor", async () => {
      const threads = [
        dbBoardThreadWithUserAndBoardMessagesBuilder(),
        dbBoardThreadWithUserAndBoardMessagesBuilder(),
      ];
      vi.mocked(getPrisma().boardThread.findMany).mockResolvedValue(threads);
      const pagination = {
        cursor: 42,
        count: 2,
      };

      expect(await getBoardThreads(pagination)).toEqual(threads);

      expect(getPrisma().boardThread.findMany).toHaveBeenCalledWith({
        cursor: { id: pagination.cursor },
        take: pagination.count,
        include: {
          user: true,
          boardMessages: {
            include: {
              user: true,
              childMessages: { select: { id: true } },
            },
          },
        },
      });
    });

    it("should return threads without cursor", async () => {
      const threads = [
        dbBoardThreadWithUserAndBoardMessagesBuilder(),
        dbBoardThreadWithUserAndBoardMessagesBuilder(),
      ];
      vi.mocked(getPrisma().boardThread.findMany).mockResolvedValue(threads);
      const pagination = { count: 2 };

      expect(await getBoardThreads(pagination)).toEqual(threads);

      expect(getPrisma().boardThread.findMany).toHaveBeenCalledWith({
        take: pagination.count,
        include: {
          user: true,
          boardMessages: {
            include: {
              user: true,
              childMessages: { select: { id: true } },
            },
          },
        },
      });
    });
  });

  describe("getBoardThread", () => {
    it("should return unique result when thread found", async () => {
      const thread = dbBoardThreadBuilder();
      vi.mocked(getPrisma().boardThread.findUnique).mockResolvedValue(thread);

      expect(await getBoardThread(thread.id)).toEqual(thread);
      expect(getPrisma().boardThread.findUnique).toHaveBeenCalledWith({
        where: { id: thread.id },
      });
    });

    it("should return undefined when thread not found", async () => {
      vi.mocked(getPrisma().boardThread.findUnique).mockResolvedValue(null);

      expect(await getBoardThread(1)).toBeUndefined();
      expect(getPrisma().boardThread.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("createBoardThread", () => {
    it("should create a thread linked to a user and return thread with additional properties", async () => {
      const threadRequest = {
        title: faker.lorem.sentence(),
        message: faker.lorem.sentence(),
      } satisfies CreateBoardThreadRequest;
      const thread = dbBoardThreadBuilder(threadRequest);
      const user = dbUserBuilder();

      vi.mocked(getPrisma().boardThread.create).mockResolvedValue(thread);

      expect(await createBoardThread(threadRequest, user)).toEqual({
        ...thread,
        user,
        boardMessages: [],
      });

      expect(getPrisma().boardThread.create).toHaveBeenCalledWith({
        data: { ...threadRequest, user: { connect: user } },
      });
    });
  });
});
