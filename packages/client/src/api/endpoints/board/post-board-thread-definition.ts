import type { ApiEndpointMutationDefinition } from "@repo/client/api/endpoints/endpoint-definitions.ts";
import { boardThreadListTag } from "@repo/client/api/tags/board-tags.ts";
import {
  type BoardThreadViewModel,
  type CreateBoardThreadRequest,
  boardThreadViewModel,
  createBoardThreadRequest,
} from "@repo/schemas/api/board/board-thread.ts";

export const postBoardThreadDefinition = {
  query: (params) => ({
    url: "/board/threads",
    method: "POST",
    body: createBoardThreadRequest.parse(params),
  }),
  transformResponse: (r) => boardThreadViewModel.parse(r),
  invalidatesTags: [boardThreadListTag],
} satisfies ApiEndpointMutationDefinition<
  CreateBoardThreadRequest,
  BoardThreadViewModel
>;
