import type { JavaApiEndpointDefinition } from "@repo/client/api/api-types.ts";
import {
  type BoardThreadResponse,
  boardThreadResponse,
  createBoardThreadRequest,
  type CreateBoardThreadRequest,
} from "@repo/schemas/api/board/board-thread.ts";

export const postBoardThreadDefinition = {
  query: (params) => ({
    url: "/board/threads",
    method: "POST",
    body: createBoardThreadRequest.parse(params),
  }),
  transformResponse: (r) => boardThreadResponse.parse(r),
} satisfies JavaApiEndpointDefinition<
  CreateBoardThreadRequest,
  BoardThreadResponse
>;
