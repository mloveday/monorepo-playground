import * as path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      provider: "istanbul",
      thresholds: {
        100: true,
      },
      exclude: ["test/**", "node_modules", ".turbo", "dist"],
    },
    alias: {
      "@repo/lib": path.resolve(__dirname, "./src"),
    },
  },
});
