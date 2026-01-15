import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  images: { unoptimized: true },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx$/,
      type: 'asset/source',
    });
  },
};

export default nextConfig;
