import { getPrisma } from "@repo/db";
import { beforeEach, vi } from "vitest";
import { mockDeep } from "vitest-mock-extended";

vi.mock(import("@repo/db"), async (importOriginal) => {
  const og = await importOriginal();
  return { ...og, getPrisma: vi.fn() };
});

beforeEach(() => {
  vi.mocked(getPrisma).mockReturnValue(mockDeep());
});
