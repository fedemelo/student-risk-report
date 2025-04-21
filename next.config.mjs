/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/estudiantes-en-riesgo",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
