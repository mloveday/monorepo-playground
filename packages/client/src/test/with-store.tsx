import { keycloakSlice } from "@repo/client/state/keycloak-auth.ts";
import { useAppDispatch } from "@repo/client/store/store.ts";
import type React from "react";
import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { StoreProvider } from "../store/store-provider";

const AuthSetter: React.FC<{ authenticated: boolean }> = ({
  authenticated,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      keycloakSlice.actions.setAuth({
        authenticated,
        state: "done",
      }),
    );
  });
  return null;
};

export const withStore = <Props extends PropsWithChildren = object>(
  Component: React.FC<Props>,
  authenticated = true,
): React.FC<Props> => {
  const wrapped: React.FC<Props> = (props) => (
    <StoreProvider>
      <AuthSetter authenticated={authenticated} />
      <Component {...props}>{props.children}</Component>
    </StoreProvider>
  );
  wrapped.displayName = `WithStore_${Component.displayName}`;
  return wrapped;
};
