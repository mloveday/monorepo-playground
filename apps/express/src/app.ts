import { board } from "@/src/board.ts";
import { authorizationMiddleware } from "@/src/middleware/authorization-middleware.ts";
import { healthCheckRequestSchema } from "@repo/schemas/api/healthcheck/health-check-request.ts";
import type { HealthCheckResponse } from "@repo/schemas/api/healthcheck/health-check-response.ts";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

export const app = express();

app.use(cors(), bodyParser.json());

app.get(
  "/healthcheck",
  authorizationMiddleware({ optional: true }),
  async (req, res) => {
    const OK = {
      success: true,
      message: "All good",
      sub: res.locals.auth?.sub,
    } satisfies HealthCheckResponse;
    const NOPE = {
      success: false,
      message: "Nope",
      sub: res.locals.auth?.sub,
    } satisfies HealthCheckResponse;
    const BAD_REQUEST = {
      success: false,
      message: "Bad request",
      sub: res.locals.auth?.sub,
    } satisfies HealthCheckResponse;

    const query = healthCheckRequestSchema.safeParse(req.query);
    if (!query.success) {
      res.status(400).json(BAD_REQUEST);
      return;
    }
    res.json(query.data.forceSucceed ? OK : NOPE);
  },
);

app.use("/board", board);
