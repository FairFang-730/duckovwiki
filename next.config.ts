import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  images: { unoptimized: true },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx$/,
      type: 'asset/source',
    });
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
