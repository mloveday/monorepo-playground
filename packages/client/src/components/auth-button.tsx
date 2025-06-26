import { getKeycloakInstance } from "@repo/client/state/get-keycloak-instance.ts";
import { useIsAuthenticated } from "@repo/client/state/keycloak-auth.ts";

export const AuthButton = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <button
      type="button"
      onClick={() => {
        const keycloak = getKeycloakInstance();
        return isAuthenticated ? keycloak.logout() : keycloak.login();
      }}
    >
      {isAuthenticated ? "Sign out" : "Sign in"}
    </button>
  );
};
