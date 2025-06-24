import * as path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["src/test/setup.ts"],
    coverage: {
      provider: "istanbul",
      thresholds: {
        100: true,
      },
      exclude: [
        "src/test/**",
        "node_modules",
        ".turbo",
        "dist",
        "tailwind.config.ts",
      ],
    },
    alias: {
      "@repo/client": path.resolve(__dirname, "src"),
    },
  },
});
