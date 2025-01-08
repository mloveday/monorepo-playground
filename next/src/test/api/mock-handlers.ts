import { http, HttpResponse } from "msw";
import { HttpResponseResolver } from "msw/core/http";

// adds a small amount of latency to the call to allow the UI to show loading states
export const withLatency =
  (fn: HttpResponseResolver): HttpResponseResolver =>
  async (...args) => {
    await new Promise((r) => setTimeout(r, 5));
    return fn(...args);
  };

export const mockHandlers = [
  http.get("/api/healthcheck", () =>
    HttpResponse.json({
      success: true,
      message: "mocked healthcheck response",
    }),
  ),
];
