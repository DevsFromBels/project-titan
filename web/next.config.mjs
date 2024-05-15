import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'titanproject.top',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars-api.titanproject.top',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // productionBrowserSourceMaps: false, // Disable source maps in development
  // optimizeFonts: false, // Disable font optimization
  // minify: false, // Disable minification
};

export default withNextIntl(nextConfig);
