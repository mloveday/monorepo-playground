import { describe, expect, it, vi } from "vitest";
import { AuthButton } from "@repo/client/components/auth-button.tsx";
import { withStore } from "../test/with-store";
import { testRender } from "@repo/test/test-render.ts";
import { getKeycloakInstance } from "@repo/client/state/get-keycloak-instance.ts";

vi.mock("@repo/client/state/get-keycloak-instance.ts", () => {
  // NB: these functions cause page navigation to the keycloak IDP, we can't test the effect here
  const keycloak = { logout: vi.fn(), login: vi.fn() };
  return { getKeycloakInstance: () => keycloak };
});

describe("AuthButton", () => {
  it("should allow sign in when anonymous", async () => {
    const TestComponent = withStore(AuthButton, false);

    const result = testRender(<TestComponent />);

    await result.user.click(
      await result.findByRole("button", { name: "Sign in" }),
    );
    expect(getKeycloakInstance().login).toHaveBeenCalled();
  });

  it("should allow sign out when authenticated", async () => {
    const TestComponent = withStore(AuthButton, true);

    const result = testRender(<TestComponent />);

    await result.user.click(
      await result.findByRole("button", { name: "Sign out" }),
    );
    expect(getKeycloakInstance().logout).toHaveBeenCalled();
  });
});
