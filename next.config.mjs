/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/default.aspx", destination: "/", permanent: true },
      { source: "/home.aspx", destination: "/", permanent: true },
      { source: "/services.aspx", destination: "/services", permanent: true },
      { source: "/faq.aspx", destination: "/faq", permanent: true },
      { source: "/contact.aspx", destination: "/contact", permanent: true },
      { source: "/realtors.aspx", destination: "/realtors", permanent: true },
      { source: "/rental.aspx", destination: "/services/portable-toilets", permanent: true },
    ];
  },
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
