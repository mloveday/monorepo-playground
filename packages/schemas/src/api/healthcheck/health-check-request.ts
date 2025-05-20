import { booleanAsStringSchema } from "@repo/schemas/parsing/boolean-as-string-schema.ts";
import { z } from "zod/v4";

export const healthCheckRequestSchema = z.object({
  forceSucceed: booleanAsStringSchema,
});

export type HealthCheckRequest = z.infer<typeof healthCheckRequestSchema>;
