import { z } from "zod/v4";

export const userSchema = z.object({
  provider: z.string(),
  sub: z.uuid(),
  name: z.string(),
});

export type UserViewModel = z.infer<typeof userSchema>;
