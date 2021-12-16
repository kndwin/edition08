import styles from "./styles.module.scss"
import { Article, Articles, Navigator } from "components/pages/Journal";

export function ArticlesContainer({ articles}: any) {
	return (
		<div className={styles.journalWrapper}>
			<Navigator />
			<Articles articles={articles} />
		</div>
	)
}

export function ArticleContainer({ article}: any) {
	return (
		<div className={styles.journalWrapper}>
			<Navigator />
			<Article article={article} />
		</div>
	)
}
