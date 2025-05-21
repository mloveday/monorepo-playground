import sharedConfig from "@repo/config-tailwind/src/tailwind.config";
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/client/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig],
} satisfies Config;

export default config;
