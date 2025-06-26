import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@repo/client/styles.css";
import { App } from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: this element exists
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
