import sharedConfig from "@repo/config-tailwind";
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./client/**/*.{js,ts,jsx,tsx,mdx}",
    "./server/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig],
} satisfies Config;

export default config;
