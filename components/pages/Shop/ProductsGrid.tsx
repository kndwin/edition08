import Link from "next/link";
import styles from "./styles.module.scss";
import type { Product } from "types";

export const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
		<div className={styles.grid}>
			{products?.map(({ id, title, images }) => (
				<Link key={id} href={`/shop/${id}`}>
					<div className={styles.product}>
						<img src={images[0]} alt={`Close up of ${title}`} />
						<p className={styles.productName}>001. {title}</p>
						<p className={styles.price}>$35.00</p>
					</div>
				</Link>
			))}
		</div>
	);
};
