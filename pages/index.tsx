import type { NextPage } from "next";

import styles from "./index.module.scss";
import { Layout } from "components";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Hello world!</h1>
      </div>
    </Layout>
  );
};

export default Home;
