import Link from "next/link";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";

import { Button, FlexContainer, FlexItem, } from "./styledComponents/general";
import { NavigationView, Balance, RightNav, Logo } from "./styledComponents/navigation";
import { SiEthereum } from 'react-icons/si';

export default function Navigation() {
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

  const formatAddress = (addr: string) => {
    return `${addr.substr(0, 6)}...${addr.substr(-4)}`
  }

  return (
    <NavigationView>
      <FlexContainer>
        <FlexItem widthPercent={50}>
          <Logo>
            <SiEthereum /> ETH Atlantis
          </Logo>
        </FlexItem>
        <FlexItem widthPercent={50}>
          <RightNav widthPixel={300}>
            {showConnectButton && (
              <Button textSize={10} onClick={handleConnect}>
                {status === "loading" ? "loading..." : "Connect Wallet"}
              </Button>
            )}
            {showInstallMetaMask && (
              <Link href="https://metamask.io/" target="_blank">
                Install MetaMask
              </Link>
            )}
            {wallet && balance && (
              <>
                {isConnected && <Button textSize={10} onClick={handleDisconnect}>Disconnect</Button>}
                <a
                  className="text_link tooltip-bottom"
                  href={`https://etherscan.io/address/${wallet}`} target="_blank"
                  data-tooltip="Open in Etherscan"
                >
                  {formatAddress(wallet)}
                </a>
                <Balance>
                  {(parseInt(balance) / 1000000000000000000).toFixed(2)}{" "}ETH
                </Balance>
              </>
            )}
          </RightNav>
        </FlexItem>
      </FlexContainer>
    </NavigationView>
  );
}
