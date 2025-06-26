"use client";
import { AuthWrapper } from "@repo/client/components/auth/auth-wrapper.tsx";
import { StoreProvider } from "@repo/client/store/store-provider.tsx";
import type { PropsWithChildren } from "react";

export const ClientBoundary = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </StoreProvider>
  );
};
