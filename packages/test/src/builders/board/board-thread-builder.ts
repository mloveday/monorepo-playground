import { generateBuilderFromSchema } from "@repo/zod-builders";
import { boardThreadResponse } from "@repo/schemas/api/board/board-thread.ts";
import { boardMessageArrayOverride } from "@repo/test/builders/board/board-message-builder.ts";

export const boardThreadBuilder = generateBuilderFromSchema(
  boardThreadResponse,
  {
    paths: [boardMessageArrayOverride("$.boardMessages")],
  },
);
