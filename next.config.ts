import type { NextConfig } from "next";

// A fully static site (no server): fast, cheap, and the whole app can be
// cached for offline use. Every page is pre-built into /out.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
