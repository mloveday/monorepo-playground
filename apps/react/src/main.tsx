import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@repo/client/styles.css";
import { App } from "./App.tsx";
import { ClientBoundary } from "@repo/client/client-boundary.tsx";
import { BrowserRouter } from "react-router";

// biome-ignore lint/style/noNonNullAssertion: this element exists
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClientBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClientBoundary>
  </StrictMode>,
);
