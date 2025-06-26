import type { JavaApiEndpointMutationDefinition } from "@repo/client/api/api-types.ts";
import {
  boardMessageTagFromId,
  boardThreadListTag,
} from "@repo/client/api/tags/board-tags.ts";
import {
  type BoardMessageResponse,
  type CreateBoardMessageRequest,
  boardMessageResponse,
  createBoardMessageRequest,
} from "@repo/schemas/api/board/board-message.ts";

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
