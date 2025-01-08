import { z } from "zod";

export const booleanAsStringSchema = z
  .union([z.literal("true"), z.literal("false")])
  .transform((v) => v === "true");
