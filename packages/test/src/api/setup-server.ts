import { mockHandlers } from "@repo/test/api/mock-handlers.ts";
import { setupServer } from "msw/node";

export const server = setupServer(...mockHandlers);
