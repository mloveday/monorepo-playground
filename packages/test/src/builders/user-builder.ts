import { userViewModel } from "@repo/schemas/api/user/user-view-model.ts";
import { generateBuilderFromSchema } from "@repo/zod-builders/generate-builder-from-schema.ts";
import type { ObjectBuilder } from "@repo/zod-builders/types.ts";

export const userBuilder: ObjectBuilder<typeof userViewModel> =
  generateBuilderFromSchema(userViewModel);
