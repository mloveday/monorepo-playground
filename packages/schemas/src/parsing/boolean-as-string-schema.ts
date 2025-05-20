import { z } from "zod/v4";

export const booleanAsStringSchema = z
  .union([z.literal("true"), z.literal("false")])
  .transform((v) => v === "true");
