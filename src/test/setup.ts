import {server} from '@/test/api/setup-server';
import {afterAll, afterEach, beforeAll, beforeEach} from "vitest";
import {api} from "@/client/api/api";
import {cleanup} from "@testing-library/react";

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
