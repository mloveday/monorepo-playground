import { z } from "zod/v4";

export const userSchema = z.object({
  provider: z.string(),
  sub: z.uuid(),
  name: z.string(),
});

export const apiEntityResponseBase = z.object({
  id: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: userSchema,
});

export const boardMessageResponse = apiEntityResponseBase.extend({
  message: z.string(),
  boardThreadId: z.number().int(),
  parentMessageId: z.number().int().optional(),
  get childMessages() {
    return boardMessageResponse.array();
  },
});

export type BoardMessageResponse = z.infer<typeof boardMessageResponse>;

export type GetBoardMessageRequest = {
  boardThreadId: number;
};

export const createBoardMessageRequest = z.object({
  message: z.string(),
  boardThreadId: z.number().int(),
  parentMessageId: z.number().int().optional(),
});

export type CreateBoardMessageRequest = z.infer<
  typeof createBoardMessageRequest
>;

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
