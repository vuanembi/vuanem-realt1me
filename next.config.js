/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { net: false, stream: false, crypto: false };

    return config;
  },
};
