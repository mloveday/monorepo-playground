import { createApi, type EndpointBuilder } from "@reduxjs/toolkit/query/react";
import {
  apiBaseQuery,
  javaApiBaseQuery,
} from "@repo/client/api/api-base-query.ts";
import {
  apiReducerPath,
  javaApiReducerPath,
} from "@repo/client/api/api-reducer-path.ts";
import type {
  ApiBaseQuery,
  ApiReducerPath,
  JavaApiBaseQuery,
  JavaApiReducerPath,
} from "@repo/client/api/api-types.ts";
import { healthcheckDefinition } from "@repo/client/api/endpoints/healthcheck/healthcheck-definition.ts";
import { getRecentSomeDataDefinition } from "@repo/client/api/endpoints/some-data/get-recent-some-data-definition.ts";
import { postSomeDataDefinition } from "@repo/client/api/endpoints/some-data/post-some-data-definition.ts";
import {
  type SomeDataTagType,
  someDataTagType,
} from "@repo/client/api/tags/some-data-tags.ts";
import { getBoardThreadsDefinition } from "@repo/client/api/endpoints/board/get-board-threads-definition.ts";
import { getBoardMessageDefinition } from "@repo/client/api/endpoints/board/get-board-message-definition.ts";
import { postBoardReplyDefinition } from "@repo/client/api/endpoints/board/post-board-reply-definition.ts";
import { postBoardThreadDefinition } from "@repo/client/api/endpoints/board/post-board-thread-definition.ts";

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

export const javaApi = createApi({
  reducerPath: javaApiReducerPath,
  baseQuery: javaApiBaseQuery,
  tagTypes,
  endpoints: (
    builder: EndpointBuilder<JavaApiBaseQuery, TagTypes, JavaApiReducerPath>,
  ) => ({
    getBoardThreads: builder.query(getBoardThreadsDefinition),
    getBoardMessage: builder.query(getBoardMessageDefinition),
    createBoardMessage: builder.mutation(postBoardReplyDefinition),
    createBoardThread: builder.mutation(postBoardThreadDefinition),
  }),
});
