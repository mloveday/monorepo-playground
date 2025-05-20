"use server";
import { getRecentSomeDataRequestParsedSchema } from "@repo/schemas/api/some-data/get-recent-some-data-request-schema.ts";
import { postSomeDataRequestSchema } from "@repo/schemas/api/some-data/post-some-data-request-schema.ts";
import type { ApiHandler } from "@repo/server/api/api-handler.ts";
import { getSearchParamsAsRecord } from "@repo/server/lib/get-search-params-as-record.ts";
import {
  findMostRecentlyCreatedSomeData,
  storeSomeData,
} from "@repo/server/repo/some-data/some-data-repo.ts";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

export const GET: ApiHandler = async (req) => {
  const searchParams = getSearchParamsAsRecord(req.nextUrl.searchParams);
  const params = getRecentSomeDataRequestParsedSchema.safeParse(searchParams);
  if (!params.success)
    return NextResponse.json(
      { success: false, message: z.prettifyError(params.error) },
      { status: 400 },
    );
  return NextResponse.json(
    await findMostRecentlyCreatedSomeData(
      params.data.count,
      params.data.cursor,
    ),
  );
};

export const POST: ApiHandler = async (req) => {
  const params = postSomeDataRequestSchema.safeParse(await req.json());
  if (!params.success)
    return NextResponse.json(
      { success: false, message: z.prettifyError(params.error) },
      { status: 400 },
    );
  const someData = await storeSomeData(params.data);
  return Response.json({ success: true, data: someData });
};
