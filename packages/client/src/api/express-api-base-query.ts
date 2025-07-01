import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "@repo/client/api/prepare-headers.ts";

export type ApiBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
>;

export const expressApiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders,
}) satisfies ApiBaseQuery;

export const javaApiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8081",
  prepareHeaders,
}) satisfies ApiBaseQuery;
