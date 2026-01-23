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
        destination: "http://backend:3000/:path*",
      },
      {
        source: "/static/:path*",
        destination: "http://backend:3000/static/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
