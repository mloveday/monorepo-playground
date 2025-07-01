import { type EndpointBuilder, createApi } from "@reduxjs/toolkit/query/react";
import {
  type ApiReducerPath,
  type JavaApiReducerPath,
  apiReducerPath,
  javaApiReducerPath,
} from "@repo/client/api/api-reducer-path.ts";
import { getBoardThreadsDefinition } from "@repo/client/api/endpoints/board/get-board-threads-definition.ts";
import { postBoardMessageDefinition } from "@repo/client/api/endpoints/board/post-board-message-definition.ts";
import { postBoardThreadDefinition } from "@repo/client/api/endpoints/board/post-board-thread-definition.ts";
import { healthcheckDefinition } from "@repo/client/api/endpoints/healthcheck/healthcheck-definition.ts";
import {
  type ApiBaseQuery,
  expressApiBaseQuery,
  javaApiBaseQuery,
} from "@repo/client/api/express-api-base-query.ts";
import {
  type BoardMessageTagType,
  type BoardThreadTagType,
  boardMessageTagType,
  boardThreadTagType,
} from "@repo/client/api/tags/board-tags.ts";

type TagTypes = BoardThreadTagType | BoardMessageTagType;
const tagTypes = [boardThreadTagType, boardMessageTagType];

export const expressApi = createApi({
  reducerPath: apiReducerPath,
  baseQuery: expressApiBaseQuery,
  tagTypes,
  endpoints: (
    builder: EndpointBuilder<ApiBaseQuery, TagTypes, ApiReducerPath>,
  ) => ({
    getHealthCheck: builder.query(healthcheckDefinition),
    getBoardThreads: builder.query(getBoardThreadsDefinition),
    createBoardMessage: builder.mutation(postBoardMessageDefinition),
    createBoardThread: builder.mutation(postBoardThreadDefinition),
  }),
});

export const javaApi = createApi({
  reducerPath: javaApiReducerPath,
  baseQuery: javaApiBaseQuery,
  tagTypes,
  endpoints: (
    builder: EndpointBuilder<ApiBaseQuery, TagTypes, JavaApiReducerPath>,
  ) => ({
    getBoardThreads: builder.query(getBoardThreadsDefinition),
    createBoardMessage: builder.mutation(postBoardMessageDefinition),
    createBoardThread: builder.mutation(postBoardThreadDefinition),
  }),
});
