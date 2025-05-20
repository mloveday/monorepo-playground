import { z } from "zod/v4";

export const healthCheckResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type HealthCheckResponse = z.infer<typeof healthCheckResponseSchema>;
