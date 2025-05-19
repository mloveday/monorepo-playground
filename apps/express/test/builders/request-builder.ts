import type { Request } from "express";

export const requestBuilder = ({
  query,
  body,
}: {
  query?: Record<string, unknown>;
  body?: unknown;
}): Request => {
  const req = { query: query ?? {}, body } as Record<string, unknown>;
  return req as unknown as Request;
};
