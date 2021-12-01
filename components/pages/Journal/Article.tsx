import type { ArticleProp } from "types";

import styles from "./styles.module.scss";

export interface ArticleProps {
  article: ArticleProp;
}

export const Article = ({ article }: ArticleProps) => {
  const { title, content, image } = article;

  return (
    <div className={styles.articleWrapper}>
      <img className={styles.image} src={image} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
