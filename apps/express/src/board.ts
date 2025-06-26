import express from "express";
import {
  authorizationMiddleware,
  getServerUserFromResponse,
} from "@/src/middleware/authorization-middleware.ts";
import {
  createBoardThread,
  getBoardThread,
  getBoardThreads,
} from "@repo/server/repo/board/board-thread-repo.ts";
import {
  createBoardMessage,
  getBoardMessage,
} from "@repo/server/repo/board/board-message-repo.ts";
import { boardThreadToResponse } from "@repo/server/models/board/board-thread-to-response.ts";
import { createBoardThreadRequest } from "@repo/schemas/api/board/board-thread.ts";
import { getOrCreateUser } from "@repo/server/repo/user/user-repo.ts";
import { boardMessageToViewModel } from "@repo/server/models/board/board-message-to-view-model.ts";
import { createBoardMessageRequest } from "@repo/schemas/api/board/board-message.ts";

export const board = express.Router();

board.get("/threads", async (_, res) => {
  const threads = await getBoardThreads({ count: 10 });
  const response = threads.map(boardThreadToResponse);
  res.json(response);
});

board.post("/threads", authorizationMiddleware(), async (req, res) => {
  const requestThread = createBoardThreadRequest.parse(req.body);
  const user = await getOrCreateUser(getServerUserFromResponse(res));
  const boardThread = await createBoardThread(requestThread, user);
  res.status(201).json(boardThreadToResponse(boardThread));
});

board.post("/messages", authorizationMiddleware(), async (req, res) => {
  const requestMessage = createBoardMessageRequest.parse(req.body);
  const user = await getOrCreateUser(getServerUserFromResponse(res));
  const boardThread = await getBoardThread(requestMessage.boardThreadId);
  if (!boardThread) {
    res.sendStatus(404);
    return;
  }
  const parentMessage =
    requestMessage.parentMessageId !== undefined
      ? await getBoardMessage(requestMessage.parentMessageId)
      : undefined;
  const boardMessage = await createBoardMessage(
    requestMessage,
    boardThread,
    user,
    parentMessage,
  );
  res.status(201).json(boardMessageToViewModel(boardMessage, []));
});
