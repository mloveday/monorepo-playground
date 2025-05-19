import type { ApiEndpointMutationDefinition } from "@repo/client/api/api-types.ts";
import {
  type SomeDataTagType,
  someDataListTag,
} from "@repo/client/api/tags/some-data-tags.ts";
import type { postSomeDataRequestSchema } from "@repo/schemas/api/some-data/post-some-data-request-schema.ts";
import { someDataSerializedSchema } from "@repo/schemas/api/some-data/some-data-schema.ts";
import type { z } from "zod";

export type PostSomeDataResponse = z.infer<typeof someDataSerializedSchema>;

export const postSomeDataDefinition = {
  query: (body) => ({ url: "/some-data", method: "POST", body }),
  transformResponse: (r) => someDataSerializedSchema.parse(r),
  invalidatesTags: () => [someDataListTag],
} satisfies ApiEndpointMutationDefinition<
  z.infer<typeof postSomeDataRequestSchema>,
  PostSomeDataResponse,
  SomeDataTagType
>;
