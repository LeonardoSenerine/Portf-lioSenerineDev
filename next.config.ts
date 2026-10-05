import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O layout raiz fica dentro de [lang]; a 404 do site inteiro vem de
  // src/app/global-not-found.tsx.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
