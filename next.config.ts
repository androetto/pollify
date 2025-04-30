import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // runtime: 'edge', // Removed as it is not a valid property
  },
  images: {
    domains: ['www.flaticon.es'], // Agrega el dominio de flaticon
  },
};

export default nextConfig;
