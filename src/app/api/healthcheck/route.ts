"use server";
import { NextRequest } from "next/server";

import { getSearchParamsAsRecord } from "@/server/lib/get-search-params-as-record";
import { healthCheckRequestSchema } from "@/shared/api/healthcheck/health-check-request";
import { HealthCheckResponse } from "@/shared/api/healthcheck/health-check-response";

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

export const GET = async (req: NextRequest): Promise<Response> => {
  await new Promise((r) => setTimeout(r, 1000));
  const searchParams = getSearchParamsAsRecord(req.nextUrl.searchParams);
  const query = healthCheckRequestSchema.safeParse(searchParams);
  if (!query.success) return Response.json(BAD_REQUEST, { status: 400 });
  return Response.json(query.data.forceSucceed ? OK : NOPE);
};
