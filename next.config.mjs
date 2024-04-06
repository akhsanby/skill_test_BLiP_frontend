/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
