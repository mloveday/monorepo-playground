import { describe, expect, it, vi } from "vitest";
import { AuthButton } from "@repo/client/components/auth-button.tsx";
import { getKeycloakInstance } from "@repo/client/state/get-keycloak-instance.ts";
import { testRender } from "@repo/test/test-render.ts";
import { useAppDispatch } from "@repo/client/store/store.ts";
import type React from "react";
import { useEffect } from "react";
import { initAuth } from "@repo/client/state/keycloak-auth.ts";
import { StoreProvider } from "@repo/client/store/store-provider.tsx";
import { AuthWrapper } from "@repo/client/components/auth/auth-wrapper.tsx";

vi.mock("@repo/client/state/get-keycloak-instance.ts", () => {
  // NB: these functions cause page navigation to the keycloak IDP, we can't test the effect here
  const keycloak = { init: vi.fn() };
  return { getKeycloakInstance: () => keycloak };
});

describe("keycloak auth slice", () => {
  it("should initialise auth once only", async () => {
    const DemandingComponent: React.FC = () => {
      const dispatch = useAppDispatch();
      useEffect(() => {
        dispatch(initAuth());
        dispatch(initAuth());
        dispatch(initAuth());
        dispatch(initAuth());
      }, [dispatch]);
      return null;
    };
    vi.mocked(getKeycloakInstance().init).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(true), 100)),
    );

    const result = testRender(
      <StoreProvider>
        <DemandingComponent />
        <AuthWrapper>
          <AuthButton />
        </AuthWrapper>
      </StoreProvider>,
    );

    expect(await result.findByText("Checking login...")).not.toBeNull();
    expect(
      await result.findByRole("button", { name: "Sign out" }),
    ).not.toBeNull();
    expect(getKeycloakInstance().init).toHaveBeenCalledOnce();
  });
});
