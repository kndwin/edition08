import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { config } from "utils/getConfig";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { shopifyCache } from "./cache";

const IS_BROWSER = typeof window !== "undefined"

// Shopify Storefront client
const shopifyHttpLink = new (createHttpLink as any)({
  uri: config?.shopifyUrl,
});

const shopifyAuthLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "X-Shopify-Storefront-Access-Token": config?.shopifyAccessToken,
    },
  };
});


async function persistShopifyCache(shopifyCache: any) {
	await persistCache({
		cache: shopifyCache,
		storage: new LocalStorageWrapper(window.localStorage)
	})
}

if (IS_BROWSER) persistShopifyCache(shopifyCache)

export const shopifyClient = new ApolloClient({
  link: shopifyAuthLink.concat(shopifyHttpLink),
  cache: shopifyCache,
});
