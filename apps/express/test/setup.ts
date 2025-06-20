import { beforeEach, vi } from "vitest";
import { jwtVerify } from "jose";
import { jwtVerifyDecodeOnlyMock } from "@/test/builders/jwt-verify-decode-only-mock.ts";
import { getPrisma } from "@repo/db";

vi.mock("jose", { spy: true });

beforeEach(async () => {
  await getPrisma().$executeRawUnsafe(`
    truncate table "board_message", "board_thread", "user" cascade;
  `);
  vi.mocked(jwtVerify).mockImplementation(jwtVerifyDecodeOnlyMock);
});
