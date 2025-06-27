import { boardThreadViewModel } from "@repo/schemas/api/board/board-thread.ts";
import { boardMessageArrayOverride } from "@repo/test/builders/board/board-message-builder.ts";
import { generateBuilderFromSchema } from "@repo/zod-builders/generate-builder-from-schema.ts";

export const boardThreadBuilder = generateBuilderFromSchema(
  boardThreadViewModel,
  {
    paths: [boardMessageArrayOverride("$.boardMessages")],
  },
);
