/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require("http-proxy-middleware");

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:6000/:path*",
      },
    ];
  },
  async middleware() {
    return [
      createProxyMiddleware("/api/**", {
        target: "http://localhost:6000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      }),
    ];
  },
};

module.exports = nextConfig;
