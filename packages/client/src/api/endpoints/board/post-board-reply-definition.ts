import {
  boardMessageResponse,
  type BoardMessageResponse,
  createBoardMessageRequest,
  type CreateBoardMessageRequest,
} from "@repo/schemas/api/board/board-thread.ts";
import {
  boardMessageTagFromId,
  boardThreadListTag,
} from "@repo/client/api/tags/board-tags.ts";
import type { JavaApiEndpointMutationDefinition } from "@repo/client/api/api-types.ts";

export const postBoardReplyDefinition = {
  query: (params) => ({
    url: "/board/messages",
    method: "POST",
    body: createBoardMessageRequest.parse(params),
  }),
  transformResponse: (r) => boardMessageResponse.parse(r),
  invalidatesTags: (result) =>
    result?.parentMessageId !== undefined
      ? [boardThreadListTag, boardMessageTagFromId(result.parentMessageId)]
      : [boardThreadListTag],
} satisfies JavaApiEndpointMutationDefinition<
  CreateBoardMessageRequest,
  BoardMessageResponse
>;
