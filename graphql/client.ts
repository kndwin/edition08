import { ApolloClient, InMemoryCache } from "@apollo/client";

export { shopifyClient } from "./shopify/client";
export { shopifyCache } from "./shopify/cache";

// Prismic client
export const prismicClient = new ApolloClient({
  uri: "prismic",
  cache: new InMemoryCache(),
});
