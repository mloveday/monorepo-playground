import { apiEntityResponseBase } from "@repo/schemas/api/api-entity-response-base.ts";
import { boardMessageViewModel } from "@repo/schemas/api/board/board-message.ts";
import { z } from "zod/v4";

export const boardThreadViewModel = apiEntityResponseBase.extend({
  title: z.string(),
  message: z.string(),
  boardMessages: boardMessageViewModel.array(),
});

export type BoardThreadViewModel = z.infer<typeof boardThreadViewModel>;

export const createBoardThreadRequest = z.object({
  title: z.string(),
  message: z.string(),
});

export type CreateBoardThreadRequest = z.infer<typeof createBoardThreadRequest>;
