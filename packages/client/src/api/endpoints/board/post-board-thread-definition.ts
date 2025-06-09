import type { JavaApiEndpointMutationDefinition } from "@repo/client/api/api-types.ts";
import {
  type BoardThreadResponse,
  boardThreadResponse,
  createBoardThreadRequest,
  type CreateBoardThreadRequest,
} from "@repo/schemas/api/board/board-thread.ts";
import { boardThreadListTag } from "@repo/client/api/tags/board-tags.ts";

export const postBoardThreadDefinition = {
  query: (params) => ({
    url: "/board/threads",
    method: "POST",
    body: createBoardThreadRequest.parse(params),
  }),
  transformResponse: (r) => boardThreadResponse.parse(r),
  invalidatesTags: [boardThreadListTag],
} satisfies JavaApiEndpointMutationDefinition<
  CreateBoardThreadRequest,
  BoardThreadResponse
>;
