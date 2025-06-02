/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: `${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`,
        port: '',
        // pathname: '/**', // Allow all paths in the bucket for now
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
