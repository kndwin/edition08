import Head from "next/head";

import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./styles.module.scss";

import { useCartDrawer } from "hooks/components/useCartDrawer";
import { CartModal } from "../Drawer/Cart";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {

	const { isOpen } = useCartDrawer();

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
    </div>
  );
};
