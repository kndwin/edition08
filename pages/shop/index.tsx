import { GetStaticProps, NextPage } from "next";

import { Layout } from "components";
import { ProductsGrid } from "components/pages/Shop";
import { shopifyClient } from "graphql/client";
import { GET_PRODUCTS } from "graphql/shopify";

const ShopPage: NextPage = ({ products }: any) => {
  return (
    <Layout>
      <h1>Shop</h1>
      <ProductsGrid products={products} />
    </Layout>
  );
};

export default ShopPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await shopifyClient.query({ query: GET_PRODUCTS });
	const products = res?.data?.products?.edges?.map(({ node }: any) => ({
    id: node?.id,
    title: node?.title,
    description: node?.descriptionHtml,
    images: node?.images?.edges?.map(({ node }: any) => node?.originalSrc)
  }))

  return {
    props: {
      products,
    },
  };
};
