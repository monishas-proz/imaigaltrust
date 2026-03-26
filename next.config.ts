/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,

  images: {
    unoptimized: true, // Disables image optimization for static exports
  },
  experimental: {
    nextScriptWorkers: false, // Disable Next.js Dev Tools Badge
  },
  // output: "export", // Ensures static export
};

module.exports = nextConfig;
