import { userViewModel } from "@repo/schemas/api/user/user-view-model.ts";
import { z } from "zod/v4";

export const apiEntityResponseBase = z.object({
  id: z.number().int(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  user: userViewModel,
});
