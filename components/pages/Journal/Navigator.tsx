import React, { ReactElement } from "react";
import Link from "next/link";

import styles from "./styles.module.scss"
import { useArticles } from "hooks/components/useArticles";

export interface NavigatorProps {}

export function Navigator(): ReactElement | null {
  const { articles } = useArticles();
  return (
    <div className={styles.navigatorWrapper}>
			<p className={styles.readme}>Read me</p>
      {articles?.map(({ id, title }) => (
        <Link href={`/journal/${id}`}>
          <p className={styles.title}>{title}</p>
        </Link>
      ))}
    </div>
  );
}
