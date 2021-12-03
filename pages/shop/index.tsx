import { GetStaticProps, NextPage } from "next";

import { Layout } from "components";
import { shopifyClient } from "graphql/client";
import { GET_PRODUCTS } from "graphql/shopify";
import { ShopContainer } from "components/pages/Shop";

const ShopPage: NextPage = ({ products }: any) => {
	return (
		<Layout>
			<ShopContainer products={products} />
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
