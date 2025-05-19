import { vi } from "vitest";

vi.mock("@repo/db", async (ogImport) => ({
  ...(await ogImport()),
  getPrisma: vi.fn(),
}));
