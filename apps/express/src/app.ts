import { healthCheckRequestSchema } from "@repo/schemas/api/healthcheck/health-check-request.js";
import type { HealthCheckResponse } from "@repo/schemas/api/healthcheck/health-check-response.js";
import { getRecentSomeDataRequestParsedSchema } from "@repo/schemas/api/some-data/get-recent-some-data-request-schema.js";
import { postSomeDataRequestSchema } from "@repo/schemas/api/some-data/post-some-data-request-schema.js";
import {
  findMostRecentlyCreatedSomeData,
  storeSomeData,
} from "@repo/server/repo/some-data/some-data-repo.js";
import cors from "cors";
import express from "express";
import { z } from "zod";

const app = express();

app.use(cors());

app.get("/api/healthcheck", async (req, res) => {
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
});

app.get("/api/some-data", async (req, res) => {
  const params = getRecentSomeDataRequestParsedSchema.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ success: false, message: params.error });
    return;
  }
  res.json(
    await findMostRecentlyCreatedSomeData(
      params.data.count,
      params.data.cursor,
    ),
  );
});

app.put("/api/some-data", async (req, res) => {
  const params = postSomeDataRequestSchema.parse(req.query);
  const someData = await storeSomeData(params);
  res.json(someData);
});

const port = z.string().min(1).parse(process.env.PORT);

app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsole: required for server logging
  console.log(`Example app listening on port ${port}`);
});
