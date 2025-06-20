import { z } from "zod/v4";

export const healthCheckResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  sub: z.string().optional(),
});

export type HealthCheckResponse = z.infer<typeof healthCheckResponseSchema>;
