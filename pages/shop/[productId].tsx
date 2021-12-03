import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Product } from "types";

import { shopifyClient } from "graphql/client";
import { GET_PRODUCTS, GET_PRODUCT_FROM_ID } from "graphql/shopify";

import { Layout } from "components";
import { ProductContainer } from "components/pages/Shop";

const ProductIdPage: NextPage = ({ product }: any) => {
  return (
    <Layout>
      <ProductContainer product={product} />
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
