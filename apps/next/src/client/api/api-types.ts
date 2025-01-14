import type { QueryDefinition } from "@reduxjs/toolkit/query";

import type { apiBaseQuery } from "@/client/api/api-base-query";
import type { apiReducerPath } from "@/client/api/api-reducer-path";

export type ApiBaseQuery = typeof apiBaseQuery;
export type ApiReducerPath = typeof apiReducerPath;

export type ApiEndpointDefinition<QueryArg, ResultType> = Omit<
  QueryDefinition<QueryArg, ApiBaseQuery, string, ResultType, ApiReducerPath>,
  "type"
>;
