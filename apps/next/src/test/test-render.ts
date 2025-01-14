import { type RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";

export const testRender = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, "queries"> | undefined,
) => ({
  user: userEvent.setup(),
  // Import `render` from the framework library of your choice.
  // See https://testing-library.com/docs/dom-testing-library/install#wrappers
  ...render(ui, options),
});
