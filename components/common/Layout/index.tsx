import Head from "next/head";

import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./styles.module.scss";

import { CartModal } from "../Drawer/Cart";
import { HeaderDropdown } from "../Drawer/Header";
import { useLayout, useCartDrawer } from "hooks";
import {useEffect} from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isOpen } = useCartDrawer();
  const { isHeaderDropdownOpen, setHeaderDropdown } = useLayout();

	useEffect(() => {
		setHeaderDropdown({ isOpen: false})
	}, [])

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
      {isOpen && <CartModal />}
      {isHeaderDropdownOpen && <HeaderDropdown />}
    </div>
  );
};
