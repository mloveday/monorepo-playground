import { getKeycloakInstance } from "@repo/client/state/get-keycloak-instance.ts";

const dependencies = {
  getKeycloakInstance,
};

export const prepareHeadersFactory =
  (deps: typeof dependencies) => async (headers: Headers) => {
    const keycloak = deps.getKeycloakInstance();
    if (keycloak.authenticated) {
      await keycloak.updateToken();
      headers.set("Authorization", `Bearer ${keycloak.token}`);
    }
  };

export const prepareHeaders = prepareHeadersFactory(dependencies);
