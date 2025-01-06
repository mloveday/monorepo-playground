import {setupServer} from "msw/node";

import {mockHandlers} from "@/test/api/mock-handlers";

export const server = setupServer(...mockHandlers);
