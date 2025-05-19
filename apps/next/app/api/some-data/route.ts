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

export const GET: ApiHandler = async (req) => {
  const searchParams = getSearchParamsAsRecord(req.nextUrl.searchParams);
  const params = getRecentSomeDataRequestParsedSchema.safeParse(searchParams);
  if (!params.success)
    return NextResponse.json(
      { success: false, message: params.error },
      { status: 400 },
    );
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log("params", params);
  return NextResponse.json(
    await findMostRecentlyCreatedSomeData(
      params.data.count,
      params.data.cursor,
    ),
  );
};

export const POST: ApiHandler = async (req) => {
  const params = postSomeDataRequestSchema.parse(await req.json());
  const someData = await storeSomeData(params);
  return Response.json(someData);
};
