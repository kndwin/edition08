/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
	images: {
		domains: ['cdn.shopify.com']
	},
	publicRuntimeConfig: {
		shopifyUrl: process.env.SHOPIFY_URL,
		shopifyAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
	}
}
