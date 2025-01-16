"use server";
import { getHealthcheckHandler } from "@repo/server/api/healthcheck/get-handler.ts";

export const GET = getHealthcheckHandler;
