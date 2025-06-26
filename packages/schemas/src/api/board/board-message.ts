import { apiEntityResponseBase } from "@repo/schemas/api/api-entity-response-base.ts";
import { z } from "zod/v4";

export const boardMessageViewModel = apiEntityResponseBase.extend({
  message: z.string(),
  boardThreadId: z.number().int(),
  parentMessageId: z.number().int().optional(),
  get childMessages() {
    return boardMessageViewModel.array();
  },
});

export type BoardMessageViewModel = z.infer<typeof boardMessageViewModel>;

export const createBoardMessageRequest = z.object({
  message: z.string(),
  boardThreadId: z.number().int(),
  parentMessageId: z.number().int().optional(),
});

export type CreateBoardMessageRequest = z.infer<
  typeof createBoardMessageRequest
>;
