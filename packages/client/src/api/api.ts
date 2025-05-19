import { type EndpointBuilder, createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "@repo/client/api/api-base-query.ts";
import { apiReducerPath } from "@repo/client/api/api-reducer-path.ts";
import type {
  ApiBaseQuery,
  ApiReducerPath,
} from "@repo/client/api/api-types.ts";
import { healthcheckDefinition } from "@repo/client/api/endpoints/healthcheck/healthcheck-definition.ts";
import { getRecentSomeDataDefinition } from "@repo/client/api/endpoints/some-data/get-recent-some-data-definition.ts";
import { postSomeDataDefinition } from "@repo/client/api/endpoints/some-data/post-some-data-definition.ts";
import {
  type SomeDataTagType,
  someDataTagType,
} from "@repo/client/api/tags/some-data-tags.ts";

type TagTypes = SomeDataTagType;
const tagTypes = [someDataTagType];

export const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: apiBaseQuery,
  tagTypes,
  endpoints: (
    builder: EndpointBuilder<ApiBaseQuery, TagTypes, ApiReducerPath>,
  ) => ({
    getHealthCheck: builder.query(healthcheckDefinition),
    getRecentSomeData: builder.query(getRecentSomeDataDefinition),
    postSomeData: builder.mutation(postSomeDataDefinition),
  }),
});
