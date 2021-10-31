import styles from "./styles.module.scss";

export const Article = ({ article }: any) => {
  const { title, content, image } = article;

  return (
    <div className={styles.articleWrapper}>
      <img className={styles.image} src={image} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
