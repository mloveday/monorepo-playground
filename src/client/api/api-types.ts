import {apiBaseQuery} from "@/client/api/api-base-query";
import {apiReducerPath} from "@/client/api/api-reducer-path";
import {QueryDefinition} from "@reduxjs/toolkit/query";

export type ApiBaseQuery = typeof apiBaseQuery;
export type ApiReducerPath = typeof apiReducerPath;

export type ApiEndpointDefinition<QueryArg, ResultType> = Omit<QueryDefinition<QueryArg, ApiBaseQuery, string, ResultType, ApiReducerPath>, 'type'>;