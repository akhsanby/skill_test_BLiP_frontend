/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/order",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
