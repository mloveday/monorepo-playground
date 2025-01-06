import React, {PropsWithChildren} from "react";
import {ClientBoundary} from "@/client/client-boundary";

export const withStore = <Props extends PropsWithChildren<{}> = {}>(Component: React.FC<Props>): React.FC<Props> =>
  (props) => {
  return <ClientBoundary>
    <Component {...props}>{props.children}</Component>
  </ClientBoundary>;
};