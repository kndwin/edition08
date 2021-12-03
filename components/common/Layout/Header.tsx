import Link from "next/link";

import styles from "./styles.module.scss";
import { Searchbar } from "components";
import { useCart } from "hooks/shopify";
import { useCartDrawer, useBreakpoint, useLayout } from "hooks";
import { DropdownButton } from "./DropdownButton";

export const Header = () => {
  const { cartLength } = useCart();
  const { openCart } = useCartDrawer();
	const { toggleHeaderDropdown } = useLayout()

	const { sm } = useBreakpoint()

  return (
    <nav className={styles.header}>
      <div className={styles.leftOfNav}>
				{!sm ? (
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
					<Searchbar />
        </div>
				) : (
					<DropdownButton onPress={() => toggleHeaderDropdown()} />
				)}
      </div>

      <div className={styles.centerOfNav}>
        <Link href="/">
					<img className={styles.logo} src="/logo.svg" alt="Logo" />
        </Link>
      </div>

      <div className={styles.rightOfNav}>
        <p
          className={styles.cartLink}
          onMouseDown={() => openCart() }
        >
          Shopping Bag ({cartLength})
        </p>
      </div>
    </nav>
  );
};
