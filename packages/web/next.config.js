/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/hustlers',
        destination: '/swap-meet/hustlers',
        permanent: true,
      },
      {
        source: '/gangsta-party',
        destination: '/swap-meet/hustlers',
        permanent: true,
      },
      // {
      //   source: '/hustlers/:id/flex',
      //   destination: '/hustlers/:id/flex',
      //   permanent: true,
      // },
      {
        source: '/dope',
        destination: '/inventory?section=Dope',
        permanent: true,
      },
      {
        source: '/mint',
        destination: '/hustlers/quick-buy',
        permanent: false,
      }
    ]
  }
};

module.exports = nextConfig;
