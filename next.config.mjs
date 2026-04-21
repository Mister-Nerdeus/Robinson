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
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com;",
      },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
    ];

    const requestPageHeaders = [
      {
        key: "Cache-Control",
        value: "no-store, max-age=0, must-revalidate",
      },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
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
