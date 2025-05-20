import { postSomeDataRequestSchema } from "@repo/schemas/api/some-data/post-some-data-request-schema.ts";
import { storeSomeData } from "@repo/server/repo/some-data/some-data-repo.ts";
import type { Handler } from "express";
import { z } from "zod/v4";

export const putSomeDataHandler = (async (req, res) => {
  const params = postSomeDataRequestSchema.safeParse(req.body);
  if (!params.success) {
    res
      .status(400)
      .json({ success: false, message: z.prettifyError(params.error) });
    return;
  }
  const someData = await storeSomeData(params.data);
  res.json({ success: true, data: someData });
}) satisfies Handler;
