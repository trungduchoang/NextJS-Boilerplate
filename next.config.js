/** @type {import('next').NextConfig} */

module.exports = {
  trailingSlash: true,
  env: {
    BASE_API: process.env.BASE_API,
  },
};
