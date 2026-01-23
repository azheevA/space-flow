const { source } = require("framer-motion/client");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/static/**",
      },
      {
        protocol: "http",
        hostname: "backend",
        port: "3000",
        pathname: "/static/**",
      },
    ],
  },
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
      {
        source: "/static/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/static/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
