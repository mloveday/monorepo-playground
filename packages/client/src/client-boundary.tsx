"use client";
import { StoreProvider } from "@repo/client/store/store-provider.tsx";
import type { PropsWithChildren } from "react";

export const ClientBoundary = ({ children }: PropsWithChildren) => {
  return <StoreProvider>{children}</StoreProvider>;
};
