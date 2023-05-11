/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // distDir: "dist",
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["assets.pokemon.com"],
  },
};

module.exports = nextConfig;
