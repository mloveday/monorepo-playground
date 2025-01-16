import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

import { api } from "@repo/client/api/api";
import { server } from "@repo/test/api/setup-server";

server.listen();

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  api.util.resetApiState();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
