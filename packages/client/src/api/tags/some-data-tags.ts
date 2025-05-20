import type { TagDescription } from "@reduxjs/toolkit/query";
import type { someDataParsedSchema } from "@repo/schemas/api/some-data/some-data-schema.js";
import type { z } from "zod/v4";

export type SomeDataTagType = "SomeData";
export const someDataTagType: SomeDataTagType = "SomeData";
const listId = "LIST";

export const someDataItemTag = (
  someData: Pick<z.infer<typeof someDataParsedSchema>, "id">,
): TagDescription<SomeDataTagType> => ({
  id: someData.id,
  type: someDataTagType,
});

export const someDataListTag = {
  id: listId,
  type: someDataTagType,
} satisfies TagDescription<SomeDataTagType>;
