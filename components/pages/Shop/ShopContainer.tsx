import styles from "./styles.module.scss";

import { ProductsGrid } from "./ProductsGrid";
import { Sidebar } from "./Sidebar";
import { useBreakpoint } from "hooks";

export function ShopContainer({ products }: any) {
  const { sm } = useBreakpoint();
  return (
    <div className={styles.container}>
      {!sm && <Sidebar />}
      <ProductsGrid products={products} />
    </div>
  );
}
