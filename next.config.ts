import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  redirects: async () => [
    {
      source: '/posts',
      destination: '/posts/page/1',
      permanent: true,
    },
  ],
};

export default nextConfig;
