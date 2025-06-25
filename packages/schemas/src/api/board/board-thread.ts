import { z } from "zod/v4";
import { apiEntityResponseBase } from "@repo/schemas/api/api-entity-response-base.ts";
import { boardMessageResponse } from "@repo/schemas/api/board/board-message.ts";

export const boardThreadResponse = apiEntityResponseBase.extend({
  title: z.string(),
  message: z.string(),
  boardMessages: boardMessageResponse.array(),
});

export type BoardThreadResponse = z.infer<typeof boardThreadResponse>;

export const createBoardThreadRequest = z.object({
  title: z.string(),
  message: z.string(),
});

export type CreateBoardThreadRequest = z.infer<typeof createBoardThreadRequest>;
