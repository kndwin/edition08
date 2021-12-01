import "utils/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { shopifyClient } from "graphql/client";
import { OverlayProvider, SSRProvider } from "react-aria";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			<OverlayProvider>
				<ApolloProvider client={shopifyClient}>
					<Component {...pageProps} />
				</ApolloProvider>
			</OverlayProvider>
		</SSRProvider>
  );
}
export default MyApp;
