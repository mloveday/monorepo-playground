import type {
  MutationDefinition,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import type { ApiBaseQuery } from "@repo/client/api/express-api-base-query.ts";

export type ApiEndpointDefinition<
  QueryArg,
  ResultType,
  TagType extends string = string,
> = Omit<
  QueryDefinition<QueryArg, ApiBaseQuery, TagType, ResultType, string>,
  "type"
>;

export type ApiEndpointMutationDefinition<
  QueryArg,
  ResultType,
  TagType extends string = string,
> = Omit<
  MutationDefinition<QueryArg, ApiBaseQuery, TagType, ResultType, string>,
  "type"
>;
