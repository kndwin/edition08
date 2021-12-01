import { useState } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Product } from "types";

import { shopifyClient } from "graphql/client";
import { GET_PRODUCTS, GET_PRODUCT_FROM_ID } from "graphql/shopify";

import styles from "./styles.module.scss";
import { Layout, Button, NumberField } from "components";
import { useCart } from "hooks/shopify";

const ProductIdPage: NextPage = ({ product }: any) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();

	const addItemToCartHandler = async () => {
		const cart = await addItemToCart({
			quantity,
			merchandiseId: product?.merchandiseIds[0],
			key: "product",
			value: product?.title
		})
  };

  return (
    <Layout>
      <div className={styles.gridWrapper}>
        <div className={styles.grid}>
          <img
            className={styles.image}
            src={product?.images[0]}
            alt={`Close up of ${product?.title}`}
          />
          <div>
            <h1>{product?.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
            <div className={styles.row}>
              <NumberField
                aria-label="Quantity"
                value={quantity}
                onChange={setQuantity}
              />
              <Button onPress={() => addItemToCartHandler()}>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductIdPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await shopifyClient.query({ query: GET_PRODUCTS });
  const paths = res?.data?.products?.edges?.map(({ node }: any) => ({
    params: {
      productId: node?.id,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await shopifyClient.query({
    query: GET_PRODUCT_FROM_ID,
    variables: { productId: params?.productId },
  });
  const p = res?.data?.product;
  const product: Product = {
    merchandiseIds: p.variants?.edges?.map(({ node }: any) => node.id),
    title: p?.title as string,
    description: p?.descriptionHtml,
    images: p?.images?.edges?.map(({ node }: any) => node.originalSrc),
    id: p.id,
  };
  return { props: { product }, revalidate: 600 };
};
