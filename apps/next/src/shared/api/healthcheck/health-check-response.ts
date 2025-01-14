import { z } from "zod";

export const healthCheckResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type HealthCheckResponse = z.infer<typeof healthCheckResponseSchema>;
