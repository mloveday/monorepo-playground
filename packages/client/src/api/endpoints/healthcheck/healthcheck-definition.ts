import type { ApiEndpointDefinition } from "@repo/client/api/api-types.ts";
import type { HealthCheckRequest } from "@repo/schemas/api/healthcheck/health-check-request.ts";
import {
  type HealthCheckResponse,
  healthCheckResponseSchema,
} from "@repo/schemas/api/healthcheck/health-check-response.ts";

// keep each endpoint separate, when many endpoints are present, this helps maintainability of the root API
export const healthcheckDefinition = {
  query: (params) => ({ url: "/healthcheck", params }),
  transformResponse: (r) => healthCheckResponseSchema.parse(r),
} satisfies ApiEndpointDefinition<HealthCheckRequest, HealthCheckResponse>;
