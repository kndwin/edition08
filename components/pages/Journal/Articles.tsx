import Link from "next/link";
import { ArticleProp } from "types";
import styles from "./styles.module.scss";


export const Articles = ({ articles }: any) => {
  return (
    <div className={styles.articlesWrapper}>
      {articles?.map(({ id, title, image }: ArticleProp, index: number) => (
        <Link href={`/journal/${id}`} key={id}>
          <div className={styles.article}>
            <img className={styles.image} src={image} />
            <p className={styles.heading}>
              <span className={styles.number}>
                {Number(index + 1)
                  .toString()
                  .padStart(3, "0")}{". "}
              </span>
              <span>{title}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
