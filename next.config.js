/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ["localhost", "admin.netflowacademy.com"],
  },
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: "/assets/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
