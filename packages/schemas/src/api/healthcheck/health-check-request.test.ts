import { healthCheckRequestSchema } from "@/api/healthcheck/health-check-request";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("HealthCheckRequest", () => {
  it("should parse valid requests", () => {
    expect(healthCheckRequestSchema.parse({ forceSucceed: "true" })).toEqual({
      forceSucceed: true,
    });
  });

  it("should not parse invalid requests", () => {
    expect(() =>
      healthCheckRequestSchema.parse({ forceSucceed: true }),
    ).toThrowError(ZodError);
  });
});
