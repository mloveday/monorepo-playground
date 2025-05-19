import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    setupFiles: ["test/setup.ts"],
    coverage: {
      provider: "istanbul",
      thresholds: {
        100: true,
      },
      exclude: [
        "test/**",
        "src/app.ts",
        "node_modules",
        ".turbo",
        "tailwind.config.ts",
      ],
    },
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
