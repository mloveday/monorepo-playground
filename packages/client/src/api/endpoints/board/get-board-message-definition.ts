import type { JavaApiEndpointDefinition } from "@repo/client/api/api-types.ts";
import {
  boardMessageResponse,
  type BoardMessageResponse,
  type GetBoardMessageRequest,
} from "@repo/schemas/api/board/board-thread.ts";
import {} from "@repo/client/api/tags/some-data-tags.ts";
import {
  boardMessageItemTag,
  boardMessageListTag,
  getBoardMessageChildTags,
} from "@repo/client/api/tags/board-tags.ts";

export const getBoardMessageDefinition = {
  query: (params) => ({ url: `/board/messages/${params.boardThreadId}` }),
  transformResponse: (r) => boardMessageResponse.parse(r),
  providesTags: (result) =>
    result
      ? [
          boardMessageItemTag(result),
          ...getBoardMessageChildTags(result),
          boardMessageListTag,
        ]
      : [boardMessageListTag],
} satisfies JavaApiEndpointDefinition<
  GetBoardMessageRequest,
  BoardMessageResponse
>;
