"use client";

import type { PropsWithChildren } from "react";

import { StoreProvider } from "./store/store-provider";

export const ClientBoundary = ({ children }: PropsWithChildren) => {
  return <StoreProvider>{children}</StoreProvider>;
};
