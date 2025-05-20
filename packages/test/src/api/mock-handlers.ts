import { http, HttpResponse } from "msw";
import type { HttpResponseResolver } from "msw/core/http";

// adds a small amount of latency to the call to allow the UI to show loading states
export const withLatency =
  (fn: HttpResponseResolver): HttpResponseResolver =>
  async (...args) => {
    await new Promise((r) => setTimeout(r, 10));
    return fn(...args);
  };

export const mockHandlers = [
  http.get("http://localhost:3001/api/healthcheck", () =>
    HttpResponse.json({
      success: true,
      message: "mocked healthcheck response",
    }),
  ),
];
