"use client";
import { StoreProvider } from "@repo/client/store/store-provider.tsx";
import type { PropsWithChildren } from "react";
import { AuthWrapper } from "@repo/client/components/auth/auth-wrapper.tsx";

export const ClientBoundary = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </StoreProvider>
  );
};
