import { useIsAuthenticated } from "@repo/client/state/keycloack-auth.ts";
import type React from "react";
import type { PropsWithChildren } from "react";

export const AuthenticatedOnly = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : null;
};

export const withAuthenticatedOnly =
  <T extends object>(Component: React.FC<T>) =>
  (props: T) => (
    <AuthenticatedOnly>
      <Component {...props} />
    </AuthenticatedOnly>
  );
