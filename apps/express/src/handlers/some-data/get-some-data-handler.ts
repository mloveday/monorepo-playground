import { getRecentSomeDataRequestParsedSchema } from "@repo/schemas/api/some-data/get-recent-some-data-request-schema.ts";
import { findMostRecentlyCreatedSomeData } from "@repo/server/repo/some-data/some-data-repo.ts";
import type { Handler } from "express";

export const getSomeDataHandler = (async (req, res) => {
  const params = getRecentSomeDataRequestParsedSchema.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ success: false, message: params.error });
    return;
  }
  res.json(
    await findMostRecentlyCreatedSomeData(
      params.data.count,
      params.data.cursor,
    ),
  );
}) satisfies Handler;
