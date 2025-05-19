import { healthCheckRequestSchema } from "@repo/schemas/api/healthcheck/health-check-request.js";
import type { HealthCheckResponse } from "@repo/schemas/api/healthcheck/health-check-response.js";
import type { Handler } from "express";

export const getHealthcheckHandler = (async (req, res) => {
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

  const query = healthCheckRequestSchema.safeParse(req.query);
  if (!query.success) {
    res.status(400).json(BAD_REQUEST);
    return;
  }
  res.json(query.data.forceSucceed ? OK : NOPE);
}) satisfies Handler;
