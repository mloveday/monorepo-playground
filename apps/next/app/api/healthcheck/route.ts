"use server";
import type { ApiHandler } from "@repo/server/api/api-handler.ts";
import { getHealthcheckHandler } from "@repo/server/api/healthcheck/get-handler.ts";

export const GET: ApiHandler = (req) =>
  getHealthcheckHandler(req.nextUrl.searchParams);
