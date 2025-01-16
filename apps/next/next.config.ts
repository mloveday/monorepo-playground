// istanbul ignore file -- @preserve
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/client"],
};

export default nextConfig;
