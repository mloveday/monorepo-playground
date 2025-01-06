'use client';
import React, {PropsWithChildren, useRef} from "react";
import {Provider} from "react-redux";

import {AppStore, makeStore} from "@/client/store/store";

export const StoreProvider = ({children}: PropsWithChildren) => {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}> {children} </Provider>
}