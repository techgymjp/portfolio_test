/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com', 'yakitori-chi.vercel.app', 'izanami.dev'],
  },
};

module.exports = nextConfig;
