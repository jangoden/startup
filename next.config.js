/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'd14e0irai0gcaa.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'd14e0irai0gcaa.cloudfront.net',
      },
      {
        protocol: 'http',
        hostname: 'www.tribtoday.com',
      },
      {
        protocol: 'https',
        hostname: 'www.tribtoday.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;