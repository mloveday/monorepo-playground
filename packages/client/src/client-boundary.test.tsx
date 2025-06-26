import { ClientBoundary } from "@repo/client/client-boundary.tsx";
import { AuthButton } from "@repo/client/components/auth-button.tsx";
import { getKeycloakInstance } from "@repo/client/state/get-keycloak-instance.ts";
import { testRender } from "@repo/test/test-render.ts";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@repo/client/state/get-keycloak-instance.ts", () => {
  // NB: these functions cause page navigation to the keycloak IDP, we can't test the effect here
  const keycloak = { init: vi.fn() };
  return { getKeycloakInstance: () => keycloak };
});

describe("ClientBoundary", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should initialise auth and provide authenticated state", async () => {
    vi.mocked(getKeycloakInstance().init).mockResolvedValue(true);

    const result = testRender(
      <ClientBoundary>
        <AuthButton />
      </ClientBoundary>,
    );

    expect(await result.findByText("Checking login...")).not.toBeNull();
    expect(
      await result.findByRole("button", { name: "Sign out" }),
    ).not.toBeNull();
    expect(getKeycloakInstance().init).toHaveBeenCalledOnce();
  });

  it("should initialise auth and provide anonymous state", async () => {
    vi.mocked(getKeycloakInstance().init).mockResolvedValue(false);

    const result = testRender(
      <ClientBoundary>
        <AuthButton />
      </ClientBoundary>,
    );

    expect(await result.findByText("Checking login...")).not.toBeNull();
    expect(
      await result.findByRole("button", { name: "Sign in" }),
    ).not.toBeNull();
    expect(getKeycloakInstance().init).toHaveBeenCalledOnce();
  });

  it("should initialise auth and handle auth errors", async () => {
    vi.mocked(getKeycloakInstance().init).mockRejectedValue(
      "failed to initialise auth",
    );

    const result = testRender(
      <ClientBoundary>
        <AuthButton />
      </ClientBoundary>,
    );

    expect(await result.findByText("Checking login...")).not.toBeNull();
    expect(
      await result.findByText(
        "Error initialising authentication. Please reload the page.",
      ),
    ).not.toBeNull();
    expect(getKeycloakInstance().init).toHaveBeenCalledOnce();
  });
});
