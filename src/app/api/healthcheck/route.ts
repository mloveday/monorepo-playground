"use server";
import { HealthCheckResponse } from "@/shared/api/healthcheck/health-check-response";

const OK = {
  success: true,
  message: "All good",
} satisfies HealthCheckResponse;
const NOPE = {
  success: false,
  message: "Nope",
} satisfies HealthCheckResponse;

export const GET = async (): Promise<Response> => {
  await new Promise((r) => setTimeout(r, 1000));
  return Response.json(Math.random() < 0.5 ? OK : NOPE);
};
