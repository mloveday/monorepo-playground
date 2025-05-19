import type { Response } from "express";
import { vi } from "vitest";

export const responseBuilder = (): Response => {
  const res = {} as Record<string, unknown>;
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  return res as unknown as Response;
};
