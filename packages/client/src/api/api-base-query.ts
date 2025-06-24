import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "@repo/client/api/prepare-headers.ts";

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders,
});

export const javaApiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8081",
  prepareHeaders,
});
