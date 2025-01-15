import { createApi } from "@reduxjs/toolkit/query/react";

import { apiBaseQuery } from "@/api/api-base-query";
import { apiReducerPath } from "@/api/api-reducer-path";
import { healthcheckDefinition } from "@/api/endpoints/healthcheck/healthcheck-definition";

export const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getHealthCheck: builder.query(healthcheckDefinition),
  }),
});
