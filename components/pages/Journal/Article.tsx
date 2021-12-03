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
			<div className={styles.grid}>
				<p className={styles.number}>001</p>
				<p className={styles.title}>{title}</p>
				<div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
			</div>
		</div>
  );
};
