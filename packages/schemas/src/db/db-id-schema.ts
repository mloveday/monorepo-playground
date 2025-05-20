import { z } from "zod/v4";

export const dbIdSchema = z.object({
  id: z.number(),
});
