import { createApi } from "@reduxjs/toolkit/query/react";

import { apiBaseQuery } from "@/client/api/api-base-query";
import { apiReducerPath } from "@/client/api/api-reducer-path";
import { healthcheckDefinition } from "@/client/api/endpoints/healthcheck/healthcheck-definition";

export const api = createApi({
  reducerPath: apiReducerPath,
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getHealthCheck: builder.query(healthcheckDefinition),
  }),
});
