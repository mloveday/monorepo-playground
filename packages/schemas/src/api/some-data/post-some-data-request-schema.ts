import { z } from "zod/v4";

export const postSomeDataRequestSchema = z.object({
  message: z.string(),
});
