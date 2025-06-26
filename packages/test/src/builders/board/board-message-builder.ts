import { generateBuilderFromSchema } from "@repo/zod-builders";

import { boardMessageViewModel } from "@repo/schemas/api/board/board-message.ts";

export const boardMessageBuilder = generateBuilderFromSchema(
  boardMessageViewModel,
  {
    // this is required to prevent a circular reference
    paths: [{ path: "$.childMessages", generate: () => [] }],
  },
);

// to be used in paths config in objects that reference nested board messages
export const boardMessageArrayOverride = (path: string, count = 5) => ({
  path,
  generate: () =>
    Array.from({ length: count }).map(() => boardMessageBuilder.build()),
});
