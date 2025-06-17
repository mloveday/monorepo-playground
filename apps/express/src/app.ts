import { getHealthcheckHandler } from "@/src/handlers/healthcheck/get-healthcheck-handler.ts";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { z } from "zod/v4";
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
  getBoardMessagesForThreads,
  createBoardMessage,
  getBoardMessage,
} from "@repo/server/repo/board/board-message-repo.ts";
import { boardThreadToResponse } from "@repo/server/models/board/board-thread-to-response.ts";
import {
  createBoardMessageRequest,
  createBoardThreadRequest,
} from "@repo/schemas/api/board/board-thread.ts";
import { getOrCreateUser } from "@repo/server/repo/board/user-repo.ts";
import { boardMessageToViewModel } from "@repo/server/models/board/board-message-to-view-model.ts";

const app = express();

app.use(cors(), bodyParser.json());

app.get(
  "/api/healthcheck",
  authorizationMiddleware({ optional: true }),
  getHealthcheckHandler,
);

app.get(
  "/board/threads",
  authorizationMiddleware({ optional: true }),
  async (_, res) => {
    const threads = await getBoardThreads({ count: 10 });
    const messages = await getBoardMessagesForThreads(threads);
    const response = threads.map((thread) =>
      boardThreadToResponse(thread, messages),
    );
    res.json(response);
  },
);

app.post("/board/threads", authorizationMiddleware(), async (req, res) => {
  const requestThread = createBoardThreadRequest.parse(req.body);
  const user = await getOrCreateUser(getServerUserFromResponse(res));
  const boardThread = await createBoardThread(requestThread, user);
  res.json(boardThreadToResponse(boardThread, []));
});

app.post("/board/messages", authorizationMiddleware(), async (req, res) => {
  const requestMessage = createBoardMessageRequest.parse(req.body);
  const user = await getOrCreateUser(getServerUserFromResponse(res));
  const boardThread = await getBoardThread(requestMessage.boardThreadId);
  if (!boardThread) {
    res.status(404);
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
  res.json(boardMessageToViewModel(boardMessage, []));
});

const port = z.string().min(1).parse(process.env.PORT);

app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsole: required for server logging
  console.log(`Example app listening on port ${port}`);
});
