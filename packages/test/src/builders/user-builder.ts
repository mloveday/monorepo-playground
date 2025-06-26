import {
  type ObjectBuilder,
  generateBuilderFromSchema,
} from "@repo/zod-builders";

import { userViewModel } from "@repo/schemas/api/user/user-view-model.ts";

export const userBuilder: ObjectBuilder<typeof userViewModel> =
  generateBuilderFromSchema(userViewModel);
