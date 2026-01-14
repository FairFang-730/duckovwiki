import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Removed to support @cloudflare/next-on-pages (Edge Runtime)

  // Optional: Disable image optimization if not using a paid loader
  // images: { unoptimized: true },

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
