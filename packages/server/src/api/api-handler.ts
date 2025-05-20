import type { NextRequest } from "next/server.ts";

export type ApiHandler = (req: NextRequest) => Promise<Response>;
