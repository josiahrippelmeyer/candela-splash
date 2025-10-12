import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async headers() {
    return [
      {
        // Match all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // Allow Shopify and your custom domain to embed this site in an iframe
            value: "frame-ancestors https://*.myshopify.com https://replay.com https://www.replay.com/password;"
          },
          {
            key: "X-Frame-Options",
            // Must be ALLOWALL or omitted (we use ALLOWALL for broad support)
            value: "ALLOWALL"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
