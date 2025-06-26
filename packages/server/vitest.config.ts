import * as path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    setupFiles: ["src/test/setup.ts"],
    globals: true,
    coverage: {
      provider: "istanbul",
      thresholds: {
        100: true,
      },
      exclude: ["src/test/**", "node_modules", ".turbo", "dist"],
    },
    alias: {
      "@repo/server": path.resolve(__dirname, "./src"),
    },
    restoreMocks: true,
  },
});
