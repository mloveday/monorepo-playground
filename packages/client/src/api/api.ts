import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "@repo/client/api/api-base-query.ts";
import { apiReducerPath } from "@repo/client/api/api-reducer-path.ts";
import { healthcheckDefinition } from "@repo/client/api/endpoints/healthcheck/healthcheck-definition.ts";

export const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getHealthCheck: builder.query(healthcheckDefinition),
  }),
});
