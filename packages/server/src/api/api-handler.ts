import type { NextRequest } from "next/server.js";

export type ApiHandler = (req: NextRequest) => Promise<Response>;
