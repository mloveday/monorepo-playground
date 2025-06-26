import { userSchema } from "@repo/schemas/api/user/user-schema.ts";
import { z } from "zod/v4";

export const apiEntityResponseBase = z.object({
  id: z.number().int(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  user: userSchema,
});
