const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "randomuser.me",
      "plus.unsplash.com",
      "images.unsplash.com",
      "www.worldometers.info",
      "cdn.pixabay.com",
      "img.freepik.com",
      "source.unsplash.com",
      "coin-images.coingecko.com",
    ],
  },
};

module.exports = withNextIntl(nextConfig);
