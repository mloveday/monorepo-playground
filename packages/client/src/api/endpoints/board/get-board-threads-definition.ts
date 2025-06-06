import type { JavaApiEndpointDefinition } from "@repo/client/api/api-types.ts";
import {} from "@repo/schemas/api/healthcheck/health-check-response.ts";
import {
  type BoardThreadResponse,
  boardThreadResponse,
} from "@repo/schemas/api/board/board-thread.ts";

export const getBoardThreadsDefinition = {
  query: () => ({ url: "/board/threads" }),
  transformResponse: (r) => boardThreadResponse.array().parse(r),
} satisfies JavaApiEndpointDefinition<object, BoardThreadResponse[]>;
