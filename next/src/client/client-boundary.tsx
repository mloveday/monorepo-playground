"use client";

import { PropsWithChildren } from "react";

import { StoreProvider } from "@/client/store/store-provider";

export const ClientBoundary = ({ children }: PropsWithChildren) => {
  return <StoreProvider>{children}</StoreProvider>;
};
