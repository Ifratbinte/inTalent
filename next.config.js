/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "placehold.co",
      "intalent.rixotech.com",
      "103.200.38.3",
      "127.0.0.1",
      "in-talent-project.s3.us-east-1.amazonaws.com",
    ],
  },
  // compiler: {
  //   removeConsole: true,
  // },
};

module.exports = nextConfig;
