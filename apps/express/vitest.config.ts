import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import { configDotenv } from "dotenv";

configDotenv({ path: ".env.test" });

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    fileParallelism: false, // tests use a shared DB
    setupFiles: ["test/setup.ts"],
    coverage: {
      provider: "istanbul",
      thresholds: {
        100: true,
      },
      exclude: [
        "test/**",
        "src/app.ts",
        "src/server.ts",
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
