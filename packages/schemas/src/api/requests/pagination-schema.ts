import { z } from "zod/v4";

export const paginationSchema = z.object({
  count: z.coerce.number().optional().default(10),
  cursor: z.coerce.number().optional(),
});

export type Pagination = z.infer<typeof paginationSchema>;
