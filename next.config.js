/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const nextConfig = (phase) => {
  // reactStrictMode: true,
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'test123',
        mongodb_password: 'test123',
        db_name: 'codePillDev'
      },
      reactStrictMode: true,
    }
  } else {
    return {
      env: {
        mongodb_username: 'test123',
        mongodb_password: 'test123',
        db_name: 'codePill'
      },
      reactStrictMode: true,
    }
  }
}

module.exports = nextConfig




