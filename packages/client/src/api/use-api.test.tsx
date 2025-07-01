import { expressApi, javaApi } from "@repo/client/api/api-definitions.ts";
import { apiSlice } from "@repo/client/state/api-slice.ts";
import { makeStore } from "@repo/client/store/store.ts";
import { renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import { useApi } from "./use-api";

describe("useApi", () => {
  const store = makeStore();
  const wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}> {children} </Provider>
  );

  it("should return the express API", () => {
    store.dispatch(apiSlice.actions.setApi("express"));
    const { result } = renderHook(useApi, { wrapper });
    expect(result.current).toBe(expressApi);
  });

  it("should return the java API", () => {
    store.dispatch(apiSlice.actions.setApi("java"));
    const { result } = renderHook(useApi, { wrapper });
    expect(result.current).toBe(javaApi);
  });

  it("should throw when API is misconfigured", () => {
    const selector = "not-an-api";
    // @ts-ignore
    store.dispatch(apiSlice.actions.setApi(selector));
    expect(() => renderHook(useApi, { wrapper })).toThrow(
      `unknown api "${selector}"`,
    );
  });
});
