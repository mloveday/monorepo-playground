import type { ApiEndpointMutationDefinition } from "@repo/client/api/api-types.ts";
import {
  type SomeDataTagType,
  someDataListTag,
} from "@repo/client/api/tags/some-data-tags.ts";
import type { postSomeDataRequestSchema } from "@repo/schemas/api/some-data/post-some-data-request-schema.ts";
import { someDataSerializedSchema } from "@repo/schemas/api/some-data/some-data-schema.ts";
import { z } from "zod/v4";

const postSomeDataResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: someDataSerializedSchema,
  }),
  z.object({
    success: z.literal(false),
    message: z.string(),
  }),
]);

export type PostSomeDataResponse = z.infer<typeof postSomeDataResponseSchema>;

export const postSomeDataDefinition = {
  query: (body) => ({ url: "/some-data", method: "POST", body }),
  transformResponse: (r) => postSomeDataResponseSchema.parse(r),
  invalidatesTags: () => [someDataListTag],
} satisfies ApiEndpointMutationDefinition<
  z.infer<typeof postSomeDataRequestSchema>,
  PostSomeDataResponse,
  SomeDataTagType
>;
