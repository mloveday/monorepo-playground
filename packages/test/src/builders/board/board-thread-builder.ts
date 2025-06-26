import { boardThreadResponse } from "@repo/schemas/api/board/board-thread.ts";
import { boardMessageArrayOverride } from "@repo/test/builders/board/board-message-builder.ts";
import { generateBuilderFromSchema } from "@repo/zod-builders";

export const boardThreadBuilder = generateBuilderFromSchema(
  boardThreadResponse,
  {
    paths: [boardMessageArrayOverride("$.boardMessages")],
  },
);
