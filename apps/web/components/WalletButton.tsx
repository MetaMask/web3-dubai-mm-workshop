import Link from "next/link";
import { useListen } from "../hooks/useListen";
import { useMetamask } from "../hooks/useMetamask";

export default function WalleButton() {
  const {
    dispatch,
    state: { status, isMetamaskInstalled, wallet, balance },
  } = useMetamask();
  const listen = useListen();

  const showInstallMetamask =
    status !== "pageNotLoaded" && !isMetamaskInstalled;
  const showConnectButton =
    status !== "pageNotLoaded" && isMetamaskInstalled && !wallet;

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
    <div>
      <div>
        {wallet && balance && (
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <h3>
                      Address: <span>{wallet}</span>
                    </h3>
                    <p>
                      Balance:{" "}
                      <span>
                        {(parseInt(balance) / 1000000000000000000).toFixed(4)}{" "}
                        ETH
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showConnectButton && (
          <button onClick={handleConnect}>
            {status === "loading" ? "loading..." : "Connect Wallet"}
          </button>
        )}

        {showInstallMetamask && (
          <Link href="https://metamask.io/" target="_blank">
            Install Metamask
          </Link>
        )}

        {isConnected && <button onClick={handleDisconnect}>Disconnect</button>}
      </div>
    </div>
  );
}
