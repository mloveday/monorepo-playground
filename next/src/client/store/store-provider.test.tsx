import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useHealthcheckQuery } from "@/client/api/endpoints/healthcheck/use-healthcheck-query";
import * as store from "@/client/store/store";
import * as storeProvider from "@/client/store/store-provider";

describe("StoreProvider", () => {
  it("should make & provide a single store across renders", async () => {
    vi.spyOn(store, "makeStore");
    vi.spyOn(storeProvider, "StoreProvider");

    const useStoreBasedHook = () => useHealthcheckQuery({ forceSucceed: true });

    const result = renderHook(useStoreBasedHook, {
      wrapper: storeProvider.StoreProvider,
    });

    expect(store.makeStore).toHaveBeenCalledOnce();
    expect(storeProvider.StoreProvider).toHaveBeenCalledOnce();
    // hook should not have settled
    expect(result.result.current.isSuccess).toBe(false);
    // wait for the hook to settle
    await waitFor(() => expect(result.result.current.isSuccess).toBe(true));

    result.rerender();

    expect(store.makeStore).toHaveBeenCalledOnce();
    expect(storeProvider.StoreProvider).toHaveBeenCalledTimes(2);
    // should not have to wait for the hook to settle, since the result is cached in the store
    expect(result.result.current.isSuccess).toBe(true);
  });
});
