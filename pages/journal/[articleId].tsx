import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { shopifyClient } from "graphql/client";
import { GET_ARTICLES } from "graphql/shopify";

import styles from "./styles.module.scss";
import { Layout } from "components";
import { Article, Navigator } from "components/pages/Journal";

const ArticleIdPage: NextPage = ({ article }: any) => {

  return (
    <Layout>
      <div className={styles.journalWrapper}>
				<Navigator />
        <Article article={article} />
      </div>
    </Layout>
  );
};

export default ArticleIdPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await shopifyClient.query({
    query: GET_ARTICLES,
    variables: { blogHandle: "store" },
  });
  const paths = res?.data?.blog?.articles?.edges?.map(({ node }: any) => ({
    params: {
      articleId: node?.id,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await shopifyClient.query({
    query: GET_ARTICLES,
    variables: { blogHandle: "store" },
  });

	const article = res?.data?.blog?.articles?.edges
    ?.map(({ node }: any) => ({
      id: node?.id,
      handle: node?.handle,
      title: node?.title,
      content: node?.contentHtml,
      image: node?.image?.originalSrc,
    }))
    .find(({ id }: any) => id === params?.articleId);

  return { props: { article }, revalidate: 60 * 60 * 24 };
};
