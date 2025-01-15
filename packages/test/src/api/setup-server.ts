import { setupServer } from "msw/node";

import { mockHandlers } from "@/api/mock-handlers";

export const server = setupServer(...mockHandlers);
