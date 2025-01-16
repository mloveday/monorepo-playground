import { healthCheckResponseSchema } from "@repo/schemas/api/healthcheck/health-check-response.ts";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("HealthCheckResponse", () => {
  it("should parse valid responses", () => {
    const expected = {
      success: true,
      message: "some message",
    };
    const res = {
      ...expected,
      other: "additional fields are removed",
    };
    expect(healthCheckResponseSchema.parse(res)).toEqual(expected);
  });

  it("should not parse invalid responses", () => {
    expect(() =>
      healthCheckResponseSchema.parse({ success: "true", message: 5 }),
    ).toThrowError(ZodError);
  });
});
