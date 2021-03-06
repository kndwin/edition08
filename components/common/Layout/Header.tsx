import Link from "next/link";

import styles from "./styles.module.scss";
import { Searchbar } from "components";
import { useCart } from "hooks/shopify";
import { useCartDrawer, useBreakpoint, useLayout } from "hooks";
import { DropdownButton } from "./DropdownButton";
import { useEffect } from "react";

export const Header = () => {
  const { cartLength } = useCart();
  const { openCart } = useCartDrawer();
  const { toggleHeaderDropdown } = useLayout();

  const { md } = useBreakpoint();

  const Hamburger = (
    <svg viewBox="0 0 30 25" width="25" height="30">
      <rect width="25" height="3" />
      <rect y="10" width="25" height="3" />
      <rect y="20" width="25" height="3" />
    </svg>
  );

  useEffect(() => {
		console.log("header")
    console.log({ cartLength });
  }, [cartLength]);

  return (
    <nav className={styles.header}>
      <div className={styles.leftOfNav}>
        {!md ? (
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
          <DropdownButton
            trigger={Hamburger}
            onPress={() => toggleHeaderDropdown()}
          />
        )}
      </div>

      <div className={styles.centerOfNav}>
        <Link href="/">
          <img className={styles.logo} src="/logo.png" alt="Logo" />
        </Link>
      </div>

      <div className={styles.rightOfNav}>
        <p className={styles.cartLink} onMouseDown={() => openCart()}>
          Shopping Bag {cartLength ?? 0 > 0 ? <>({cartLength})</> : ""}
        </p>
      </div>
    </nav>
  );
};
