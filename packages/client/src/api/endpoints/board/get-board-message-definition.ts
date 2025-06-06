import type { JavaApiEndpointDefinition } from "@repo/client/api/api-types.ts";
import {
  boardMessageResponse,
  type BoardMessageResponse,
  type GetBoardMessageRequest,
} from "@repo/schemas/api/board/board-thread.ts";

export const getBoardMessageDefinition = {
  query: (params) => ({ url: `/board/messages/${params.boardThreadId}` }),
  transformResponse: (r) => boardMessageResponse.parse(r),
} satisfies JavaApiEndpointDefinition<
  GetBoardMessageRequest,
  BoardMessageResponse
>;
