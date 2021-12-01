import type { NextPage } from "next";

import { Layout } from "components";
import { LandingPage, ImageGrid } from "components/pages/Index";

const Home: NextPage = () => {
  return (
    <Layout>
			<LandingPage />
			<ImageGrid />
    </Layout>
  );
};

export default Home;
