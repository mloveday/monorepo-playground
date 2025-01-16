import type { QueryDefinition } from "@reduxjs/toolkit/query";
import type { apiBaseQuery } from "@repo/client/api/api-base-query.ts";
import type { apiReducerPath } from "@repo/client/api/api-reducer-path.ts";

export type ApiBaseQuery = typeof apiBaseQuery;
export type ApiReducerPath = typeof apiReducerPath;

export type ApiEndpointDefinition<QueryArg, ResultType> = Omit<
  QueryDefinition<QueryArg, ApiBaseQuery, string, ResultType, ApiReducerPath>,
  "type"
>;
