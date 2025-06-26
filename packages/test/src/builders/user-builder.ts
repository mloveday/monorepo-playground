import {
  type ObjectBuilder,
  generateBuilderFromSchema,
} from "@repo/zod-builders";

import { userSchema } from "@repo/schemas/api/user/user-schema.ts";

export const userBuilder: ObjectBuilder<typeof userSchema> =
  generateBuilderFromSchema(userSchema);
