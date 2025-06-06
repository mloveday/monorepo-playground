import type { JavaApiEndpointDefinition } from "@repo/client/api/api-types.ts";
import {
  boardMessageResponse,
  type BoardMessageResponse,
  createBoardMessageRequest,
  type CreateBoardMessageRequest,
} from "@repo/schemas/api/board/board-thread.ts";

export const postBoardReplyDefinition = {
  query: (params) => ({
    url: "/board/messages",
    method: "POST",
    body: createBoardMessageRequest.parse(params),
  }),
  transformResponse: (r) => boardMessageResponse.parse(r),
} satisfies JavaApiEndpointDefinition<
  CreateBoardMessageRequest,
  BoardMessageResponse
>;
