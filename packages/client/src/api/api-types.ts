import type {
  MutationDefinition,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import type {
  apiBaseQuery,
  javaApiBaseQuery,
} from "@repo/client/api/api-base-query.ts";
import type {
  apiReducerPath,
  javaApiReducerPath,
} from "@repo/client/api/api-reducer-path.ts";

export type ApiBaseQuery = typeof apiBaseQuery;
export type ApiReducerPath = typeof apiReducerPath;

export type ApiEndpointDefinition<
  QueryArg,
  ResultType,
  TagType extends string = string,
> = Omit<
  QueryDefinition<QueryArg, ApiBaseQuery, TagType, ResultType, ApiReducerPath>,
  "type"
>;
export type ApiEndpointMutationDefinition<
  QueryArg,
  ResultType,
  TagType extends string = string,
> = Omit<
  MutationDefinition<
    QueryArg,
    ApiBaseQuery,
    TagType,
    ResultType,
    ApiReducerPath
  >,
  "type"
>;

export type JavaApiBaseQuery = typeof javaApiBaseQuery;
export type JavaApiReducerPath = typeof javaApiReducerPath;
export type JavaApiEndpointDefinition<
  QueryArg,
  ResultType,
  TagType extends string = string,
> = Omit<
  QueryDefinition<
    QueryArg,
    JavaApiBaseQuery,
    TagType,
    ResultType,
    JavaApiReducerPath
  >,
  "type"
>;
export type JavaApiEndpointMutationDefinition<
  QueryArg,
  ResultType,
  TagType extends string = string,
> = Omit<
  MutationDefinition<
    QueryArg,
    JavaApiBaseQuery,
    TagType,
    ResultType,
    JavaApiReducerPath
  >,
  "type"
>;
