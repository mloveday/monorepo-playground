import type { ApiEndpointDefinition } from "@repo/client/api/api-types.ts";
import {
  type SomeDataTagType,
  someDataItemTag,
  someDataListTag,
} from "@repo/client/api/tags/some-data-tags.ts";
import type { GetRecentSomeDataRequest } from "@repo/schemas/api/some-data/get-recent-some-data-request-schema.ts";
import {
  type GetRecentSomeDataResponse,
  getRecentSomeDataResponseSchema,
} from "@repo/schemas/api/some-data/get-recent-some-data-response-schema.ts";

export const getRecentSomeDataDefinition = {
  query: (params) => ({ url: "/some-data", params }),
  transformResponse: (r) => getRecentSomeDataResponseSchema.parse(r),
  providesTags: (result) =>
    result
      ? [...result.map(someDataItemTag), someDataListTag]
      : [someDataListTag],
} satisfies ApiEndpointDefinition<
  GetRecentSomeDataRequest,
  GetRecentSomeDataResponse,
  SomeDataTagType
>;
