import type { ApiEndpointDefinition } from "@/client/api/api-types";
import type { HealthCheckRequest } from "@/shared/api/healthcheck/health-check-request";
import {
  type HealthCheckResponse,
  healthCheckResponseSchema,
} from "@/shared/api/healthcheck/health-check-response";

// keep each endpoint separate, when many endpoints are present, this helps maintainability of the root API
export const healthcheckDefinition = {
  query: (params) => ({ url: "/healthcheck", params }),
  transformResponse: (r) => healthCheckResponseSchema.parse(r),
} satisfies ApiEndpointDefinition<HealthCheckRequest, HealthCheckResponse>;
