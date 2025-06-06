import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
});

export const javaApiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8081",
});
