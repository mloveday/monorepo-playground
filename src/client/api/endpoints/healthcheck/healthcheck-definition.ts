import {HealthCheckResponse, healthCheckResponseSchema} from "@/shared/api/healthcheck/health-check-response";
import {ApiEndpointDefinition} from "@/client/api/api-types";

export const healthcheckDefinition = {
  query: () => '/healthcheck',
  transformResponse: (r) => healthCheckResponseSchema.parse(r),
} satisfies ApiEndpointDefinition<void, HealthCheckResponse>;