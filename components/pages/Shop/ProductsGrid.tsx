import Link from "next/link";
import styles from "./styles.module.scss";
import type { Product } from "types";

export const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div>
      <div className={styles.grid}>
        {products?.map(({ id, title, images }) => (
          <Link key={id} href={`/shop/${id}`}>
            <div className={styles.product}>
              <img src={images[0]} alt={`Close up of ${title}`} />
              <h3>{title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
