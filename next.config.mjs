/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/50", destination: "/50.pdf", permanent: false },
      { source: "/50/", destination: "/50.pdf", permanent: false },
    ];
  },
};
export default nextConfig;
