import { expressApi } from "@repo/client/api/api-definitions.ts";
import { server } from "@repo/test/api/setup-server.ts";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

server.listen();

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  expressApi.util.resetApiState();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
