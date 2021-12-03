
import styles from "./styles.module.scss"

import { ProductsGrid } from "./ProductsGrid";
import { Sidebar } from "./Sidebar";

export function ShopContainer({ products }: any) {
	return (
		<div className={styles.container}>
			<Sidebar />
			<ProductsGrid products={products} />
		</div>
	)
}
