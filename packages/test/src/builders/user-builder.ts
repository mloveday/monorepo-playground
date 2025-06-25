import {
  generateBuilderFromSchema,
  type ObjectBuilder,
} from "@repo/zod-builders";
import { userSchema } from "@repo/schemas/api/board/board-thread.ts";

export const userBuilder: ObjectBuilder<typeof userSchema> =
  generateBuilderFromSchema(userSchema);
