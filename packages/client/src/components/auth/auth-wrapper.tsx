import { type PropsWithChildren, useEffect } from "react";
import { useAppDispatch } from "@repo/client/store/store.ts";
import {
  initAuth,
  useIsAuthenticationStatusKnown,
} from "@repo/client/state/keycloack-auth.ts";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const isAuthenticationStatusKnown = useIsAuthenticationStatusKnown();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);
  return isAuthenticationStatusKnown ? children : "checking login...";
};
