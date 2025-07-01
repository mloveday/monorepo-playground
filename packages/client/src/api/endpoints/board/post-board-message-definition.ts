import type { ApiEndpointMutationDefinition } from "@repo/client/api/endpoints/endpoint-definitions.ts";
import {
  boardMessageTagFromId,
  boardThreadListTag,
} from "@repo/client/api/tags/board-tags.ts";
import {
  type BoardMessageViewModel,
  type CreateBoardMessageRequest,
  boardMessageViewModel,
  createBoardMessageRequest,
} from "@repo/schemas/api/board/board-message.ts";

export const postBoardMessageDefinition = {
  query: (params) => ({
    url: "/board/messages",
    method: "POST",
    body: createBoardMessageRequest.parse(params),
  }),
  transformResponse: (r) => boardMessageViewModel.parse(r),
  invalidatesTags: (result) =>
    result?.parentMessageId !== undefined
      ? [boardThreadListTag, boardMessageTagFromId(result.parentMessageId)]
      : [boardThreadListTag],
} satisfies ApiEndpointMutationDefinition<
  CreateBoardMessageRequest,
  BoardMessageViewModel
>;
