import { z } from "zod";

export const postSomeDataRequestSchema = z.object({
  message: z.string(),
});
