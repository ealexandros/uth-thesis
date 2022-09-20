const withPWA = require("next-pwa")({
  dest: "public",
  mode: "production",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    outputStandalone: true,
  },
};

module.exports = withPWA(nextConfig);
