const withPWA = require("next-pwa");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pwa: {
    dest: "public",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["s4.anilist.co"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = withPWA(nextConfig);
