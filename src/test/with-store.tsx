import React, {PropsWithChildren} from "react";
import {ClientBoundary} from "@/client/client-boundary";

export const withStore = <Props extends PropsWithChildren = object>(Component: React.FC<Props>): React.FC<Props> => {
  const wrapped: React.FC<Props> = (props) =>
    <ClientBoundary>
      <Component {...props}>{props.children}</Component>
    </ClientBoundary>;
  wrapped.displayName = `WithStore_${Component.displayName}`;
  return wrapped;
};