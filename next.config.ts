import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.CPANEL_STATIC_EXPORT === "1"
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
        typescript: { ignoreBuildErrors: true },
      }
    : {}),
};

export default nextConfig;
