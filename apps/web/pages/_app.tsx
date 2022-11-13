import type { AppProps } from "next/app";
import { WalletLayout } from "../components/WalletLayout";
import { MetaMaskProvider } from "../hooks/useMetaMask";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
      <WalletLayout>
        <Component {...pageProps} />
      </WalletLayout>
    </MetaMaskProvider>
  );
}

export default MyApp;
