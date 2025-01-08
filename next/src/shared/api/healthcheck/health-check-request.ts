import { z } from "zod";

import { booleanAsStringSchema } from "@/server/lib/boolean-as-string-schema";

export const healthCheckRequestSchema = z.object({
  forceSucceed: booleanAsStringSchema,
});

export type HealthCheckRequest = z.infer<typeof healthCheckRequestSchema>;
