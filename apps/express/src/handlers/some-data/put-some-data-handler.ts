import { postSomeDataRequestSchema } from "@repo/schemas/api/some-data/post-some-data-request-schema.js";
import { storeSomeData } from "@repo/server/repo/some-data/some-data-repo.js";
import type { Handler } from "express";

export const putSomeDataHandler = (async (req, res) => {
  const params = postSomeDataRequestSchema.safeParse(req.body);
  if (!params.success) {
    res.status(400).json({ success: false, message: params.error });
    return;
  }
  const someData = await storeSomeData(params.data);
  res.json({ success: true, data: someData });
}) satisfies Handler;
