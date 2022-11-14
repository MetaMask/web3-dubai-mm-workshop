import Link from "next/link";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";

import { Button } from "./styledComponents/general";
import { WalletView } from "./styledComponents/wallet";

export default function Wallet() {
  const {
    dispatch,
    state: { status, isMetaMaskInstalled, wallet, balance },
  } = useMetaMask();
  const listen = useListen();

  const showInstallMetaMask =
    status !== "pageNotLoaded" && !isMetaMaskInstalled;
  const showConnectButton =
    status !== "pageNotLoaded" && isMetaMaskInstalled && !wallet;

  const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";

  const handleConnect = async () => {
    dispatch({ type: "loading" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      dispatch({ type: "connect", wallet: accounts[0], balance });

      // we can register an event listener for changes to the users wallet
      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnect" });
  };

  return (
    <WalletView>
      {wallet && balance && (
        <div>
          <h3>Address: <span>{wallet}</span></h3>
          <p>
            Balance:{" "}
            <span>
              {(parseInt(balance) / 1000000000000000000).toFixed(4)}{" "}
              ETH
            </span>
          </p>
        </div>
      )}

      {showConnectButton && (
        <Button onClick={handleConnect}>
          {status === "loading" ? "loading..." : "Connect Wallet"}
        </Button>
      )}

      {showInstallMetaMask && (
        <Link href="https://metamask.io/" target="_blank">
          Install MetaMask
        </Link>
      )}

      {isConnected && <Button onClick={handleDisconnect}>Disconnect</Button>}
    </WalletView>
  );
}
