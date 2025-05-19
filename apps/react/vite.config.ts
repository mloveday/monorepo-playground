import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["test/setup.ts"],
    coverage: {
      provider: "istanbul",
      thresholds: {
        100: true,
      },
      exclude: [
        "test/**",
        "node_modules",
        ".turbo",
        "tailwind.config.ts",
      ],
    },
    alias: {
      "@": path.resolve(__dirname),
    },
  },
})
