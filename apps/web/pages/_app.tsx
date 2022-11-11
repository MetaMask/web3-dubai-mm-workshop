import type { AppProps } from "next/app";
import { WalletLayout } from "../components/WalletLayout";
import { MetamaskProvider } from "../hooks/useMetamask";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetamaskProvider>
      <WalletLayout>
        <Component {...pageProps} />
      </WalletLayout>
    </MetamaskProvider>
  );
}

export default MyApp;
