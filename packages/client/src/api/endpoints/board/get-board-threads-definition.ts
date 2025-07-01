import type { ApiEndpointDefinition } from "@repo/client/api/endpoints/endpoint-definitions.ts";
import {
  boardThreadItemTag,
  boardThreadListTag,
  getThreadBoardMessageTags,
} from "@repo/client/api/tags/board-tags.ts";
import {
  type BoardThreadViewModel,
  boardThreadViewModel,
} from "@repo/schemas/api/board/board-thread.ts";

export const getBoardThreadsDefinition = {
  query: () => ({ url: "/board/threads" }),
  transformResponse: (r) => boardThreadViewModel.array().parse(r),
  providesTags: (result) =>
    result
      ? [
          ...result.map(boardThreadItemTag),
          ...result.flatMap(getThreadBoardMessageTags),
          boardThreadListTag,
        ]
      : [boardThreadListTag],
} satisfies ApiEndpointDefinition<object, BoardThreadViewModel[]>;
