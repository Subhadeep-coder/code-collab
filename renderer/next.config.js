/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  reactStrictMode: false,
  distDir: process.env.NODE_ENV === 'production' ? '../app' : '.next',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  transpilePackages: ['@babel/runtime']
}
