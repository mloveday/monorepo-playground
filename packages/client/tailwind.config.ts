import sharedConfig from "@repo/config-tailwind";
import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.tsx"],
  presets: [sharedConfig],
} satisfies Config;

export default config;
