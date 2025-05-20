import { healthCheckRequestSchema } from "@repo/schemas/api/healthcheck/health-check-request.ts";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod/v4";

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
