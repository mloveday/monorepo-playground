import type { QueryDefinition } from "@reduxjs/toolkit/query";

import type { apiBaseQuery } from "@/api/api-base-query";
import type { apiReducerPath } from "@/api/api-reducer-path";

export type ApiBaseQuery = typeof apiBaseQuery;
export type ApiReducerPath = typeof apiReducerPath;

export type ApiEndpointDefinition<QueryArg, ResultType> = Omit<
  QueryDefinition<QueryArg, ApiBaseQuery, string, ResultType, ApiReducerPath>,
  "type"
>;
