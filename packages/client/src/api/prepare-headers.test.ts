import { faker } from "@faker-js/faker/locale/en";
import { prepareHeadersFactory } from "@repo/client/api/prepare-headers.ts";
import type Keycloak from "keycloak-js";
import { describe, expect, it, vi } from "vitest";

describe("prepare-headers", () => {
  it("should set Authorization header to bearer <token> when authenticated", async () => {
    const keycloak = {
      authenticated: true,
      updateToken: vi.fn().mockResolvedValue(undefined),
      token: faker.string.nanoid(),
    };
    const prepareHeaders = prepareHeadersFactory({
      getKeycloakInstance: () => keycloak as unknown as Keycloak,
    });
    const headers = new Headers();

    await prepareHeaders(headers);

    expect(headers.get("Authorization")).toEqual(`Bearer ${keycloak.token}`);
    expect(keycloak.updateToken).toHaveBeenCalledOnce();
  });

  it("should not set Authorization header when unauthenticated", async () => {
    const keycloak = {
      authenticated: false,
      updateToken: vi.fn(),
    };
    const prepareHeaders = prepareHeadersFactory({
      getKeycloakInstance: () => keycloak as unknown as Keycloak,
    });
    const headers = new Headers();

    await prepareHeaders(headers);

    expect(headers.get("Authorization")).toBeNull();
    expect(keycloak.updateToken).not.toHaveBeenCalled();
  });
});
