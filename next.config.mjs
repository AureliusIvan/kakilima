/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        port: '',

      },
    ],
  },
  async redirects() {
    return [
      // Redirect base url / to /category
      {
        source: '/',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/detail',
        destination: '/category',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
