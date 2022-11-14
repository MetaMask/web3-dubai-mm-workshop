import 'normalize.css'
import '../styles/globals.scss'

import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { MetaMaskProvider } from "../hooks/useMetaMask";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MetaMaskProvider>
  );
}

export default MyApp;
