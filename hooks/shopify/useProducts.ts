import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_PRODUCTS, GET_PRODUCT_FROM_ID } from "graphql/shopify";
import { shopifyClient } from "graphql/client";

import type { Product } from "types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const { data: productsData } = useQuery(GET_PRODUCTS, {
    variables: { first: 12 },
    onCompleted: (data) => {
      const productsToSet = data?.products?.edges?.map(({ node }: any) => ({
        id: node?.id,
        title: node?.title,
        description: node?.descriptionHtml,
        images: node?.images?.edges?.map(({ node }: any) => node?.originalSrc),
      }));
      setProducts([...productsToSet]);
    },
    onError: (error) => console.log(JSON.stringify(error, null, 2)),
  });

  // TODO(kndwin): Figure out pagination with hooks

  const getProductFromId = async ({ productId }: any) => {
    const res = await shopifyClient.query({
      query: GET_PRODUCT_FROM_ID,
      variables: { productId },
    });
    const product: Product = {
      title: res?.data?.product?.title as string,
      description: res?.data?.product?.descriptionHtml,
      images: res?.data?.product?.images?.edges?.map(
        ({ node }: any) => node.originalSrc
      ),
      id: res?.data?.product?.id,
    };
    return product;
  };

  return { products, getProductFromId };
}
