import { z } from "zod/v4";
import { paginationSchema } from "@repo/schemas/api/requests/pagination-schema.ts";

export const getRecentSomeDataRequestSchema = z.object({
  count: z.number().optional(),
  cursor: z.number().optional(),
});

export type GetRecentSomeDataRequest = z.infer<
  typeof getRecentSomeDataRequestSchema
>;

export const getRecentSomeDataRequestParsedSchema = paginationSchema;

export type getRecentSomeDataRequestParsed = z.infer<
  typeof getRecentSomeDataRequestParsedSchema
>;
