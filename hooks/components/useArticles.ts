import { makeVar, useReactiveVar } from "@apollo/client";
import { ArticleProp } from "types";
const articlesVar = makeVar<ArticleProp[]>([]);

export const useArticles = () => {
  const articles = useReactiveVar(articlesVar);
  const setArticles = (articles: ArticleProp[]) => {
    articlesVar(articles);
  };
  return {
    articles,
    setArticles,
  };
};
