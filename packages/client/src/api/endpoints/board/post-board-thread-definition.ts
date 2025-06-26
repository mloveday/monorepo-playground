import type { JavaApiEndpointMutationDefinition } from "@repo/client/api/api-types.ts";
import { boardThreadListTag } from "@repo/client/api/tags/board-tags.ts";
import {
  type BoardThreadResponse,
  type CreateBoardThreadRequest,
  boardThreadResponse,
  createBoardThreadRequest,
} from "@repo/schemas/api/board/board-thread.ts";

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
