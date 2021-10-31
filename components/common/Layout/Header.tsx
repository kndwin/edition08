import Link from "next/link";

import styles from "./styles.module.scss";
import { Searchbar } from "components";
import { useCart } from "hooks/shopify";
import { useCartDrawer } from "hooks";

export const Header = () => {
  const { cart } = useCart();
  const { toggleCart, setIsOpen, openCart } = useCartDrawer();

  return (
    <nav className={styles.header}>
      <div className={styles.leftOfNav}>
        <div className={styles.links}>
          <Link href="/about">
            <a className={styles.links}>About</a>
          </Link>
          <Link href="/shop">
            <a className={styles.links}>Shop</a>
          </Link>
          <Link href="/journal">
            <a className={styles.links}>Journal</a>
          </Link>
        </div>
        <Searchbar />
      </div>

      <div className={styles.centerOfNav}>
        <Link href="/">
          <h1>Edition 08</h1>
        </Link>
      </div>

      <div className={styles.rightOfNav}>
        <p
          className={styles.cartLink}
          onMouseDown={() =>  openCart() }
        >
          Shopping Bag ({cart?.items?.length})
        </p>
      </div>
    </nav>
  );
};
