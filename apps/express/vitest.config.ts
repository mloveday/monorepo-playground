import path from "node:path";
import react from "@vitejs/plugin-react";
import { configDotenv } from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

configDotenv({ path: ".env.test" });

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
        "vitest.config.ts",
        "test/**",
        "src/server.ts",
        "node_modules",
        ".turbo",
      ],
    },
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
