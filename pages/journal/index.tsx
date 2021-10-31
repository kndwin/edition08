import { GetStaticProps, NextPage } from "next";

import { shopifyClient } from "graphql/client";
import { GET_ARTICLES } from "graphql/shopify";

import styles from "./styles.module.scss"
import { Layout } from "components";
import { Articles, Navigator } from "components/pages/Journal";

const JournalPage: NextPage = ({ articles }: any) => {
  return (
    <Layout>
			<div className={styles.journalWrapper}>
				<Navigator />
				<Articles articles={articles} />
			</div>
    </Layout>
  );
};

export default JournalPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await shopifyClient.query({
    query: GET_ARTICLES,
    variables: { blogHandle: "store" },
  });

  const articles = res?.data?.blog?.articles?.edges?.map(({ node }: any) => ({
    id: node?.id,
		handle: node?.handle,
    title: node?.title,
    content: node?.contentHtml,
    image: node?.image?.originalSrc,
  }));

	console.log({ res })

  return {
    props: {
			articles: articles ?? null,
    },
  };
};
