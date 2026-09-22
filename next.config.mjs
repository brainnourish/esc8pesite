/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/50", destination: "/50.pdf" },
      { source: "/50/", destination: "/50.pdf" },
    ];
  },
};
export default nextConfig;
