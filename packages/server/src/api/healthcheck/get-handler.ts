import { healthCheckRequestSchema } from "@repo/schemas/api/healthcheck/health-check-request.ts";
import type { HealthCheckResponse } from "@repo/schemas/api/healthcheck/health-check-response.ts";
import { getSearchParamsAsRecord } from "@repo/server/lib/get-search-params-as-record.ts";

const OK = {
  success: true,
  message: "All good",
} satisfies HealthCheckResponse;
const NOPE = {
  success: false,
  message: "Nope",
} satisfies HealthCheckResponse;
const BAD_REQUEST = {
  success: false,
  message: "Bad request",
} satisfies HealthCheckResponse;

// istanbul ignore next -- @preserve
const wait = () => new Promise((r) => setTimeout(r, 1000));

// production DI dependencies
const prodDependencies = { wait };

// constructor for the function, accepts DI dependencies, returns the function
export const getHealthcheckHandlerFactory =
  (deps: typeof prodDependencies = prodDependencies) =>
  async (urlSearchParams: URLSearchParams) => {
    await deps.wait();
    const searchParams = getSearchParamsAsRecord(urlSearchParams);
    const query = healthCheckRequestSchema.safeParse(searchParams);
    if (!query.success) return Response.json(BAD_REQUEST, { status: 400 });
    return Response.json(query.data.forceSucceed ? OK : NOPE);
  };

// production version, using the production DI dependencies
export const getHealthcheckHandler = getHealthcheckHandlerFactory();
