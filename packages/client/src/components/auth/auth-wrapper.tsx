import {
  initAuth,
  useIsAuthenticationError,
  useIsAuthenticationStatusKnown,
} from "@repo/client/state/keycloak-auth.ts";
import { useAppDispatch } from "@repo/client/store/store.ts";
import { type PropsWithChildren, useEffect } from "react";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const isAuthenticationStatusKnown = useIsAuthenticationStatusKnown();
  const isAuthenticationError = useIsAuthenticationError();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  if (isAuthenticationError)
    return "Error initialising authentication. Please reload the page.";
  if (isAuthenticationStatusKnown) return children;
  return "Checking login...";
};
