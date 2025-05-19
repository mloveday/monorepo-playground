import { z } from "zod";

export const dbIdSchema = z.object({
  id: z.number(),
});
