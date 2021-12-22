/** @type {import('next').NextConfig} */

const webpack = require('webpack');

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  reactStrictMode: true,
	images: {
		domains: ['cdn.shopify.com']
	},
	publicRuntimeConfig: {
		shopifyUrl: process.env.SHOPIFY_URL,
		shopifyAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
	}
}
