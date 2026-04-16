/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const requestPageHeaders = [
      {
        key: "Cache-Control",
        value: "no-store, max-age=0, must-revalidate",
      },
    ];

    return [
      { source: "/services/septic-cleaning", headers: requestPageHeaders },
      { source: "/services/well-septic-evaluations", headers: requestPageHeaders },
      { source: "/services/portable-toilets", headers: requestPageHeaders },
      { source: "/services/commercial", headers: requestPageHeaders },
      { source: "/contact", headers: requestPageHeaders },
      { source: "/realtors", headers: requestPageHeaders },
    ];
  },
};

export default nextConfig;
