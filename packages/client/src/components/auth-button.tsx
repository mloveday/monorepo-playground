import {
  keycloak,
  useIsAuthenticated,
} from "@repo/client/state/keycloack-auth.ts";

export const AuthButton = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <button
      type="button"
      onClick={() => (isAuthenticated ? keycloak.logout() : keycloak.login())}
    >
      {isAuthenticated ? "Sign out" : "Sign in"}
    </button>
  );
};
