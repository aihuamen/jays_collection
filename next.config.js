const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["s4.anilist.co"],
  },
});
