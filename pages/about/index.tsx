import type { NextPage } from "next";

import { Layout } from "components";
import { AboutUs} from "components/pages/About";

const AboutPage: NextPage = () => {
  return (
    <Layout>
			<AboutUs />
    </Layout>
  );
};

export default AboutPage;
