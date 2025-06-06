import { api, javaApi } from "@repo/client/api/api.ts";
import { server } from "@repo/test/api/setup-server.ts";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

server.listen();

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  api.util.resetApiState();
  javaApi.util.resetApiState();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
