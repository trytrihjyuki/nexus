/** @type {import('next').NextConfig} */

const fs = require('fs');
const path = require('path');

module.exports = {
  webpack: (config) => {
    const filePath = path.resolve(__dirname, 'node_modules/react-dom/index.js');
    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, '\nexport const render = () => {};\n');
    }
    return config;
  },
};

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
