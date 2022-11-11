import { getProvider } from "../lib/MetaMaskSdk";
import { ETHTickets__factory } from "blockchain";
import { config } from "../lib/config";
import { ethers } from "ethers";
import { useState } from "react";

export default function Web() {
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      const provider = getProvider();

      if (typeof provider.request !== undefined) {
        const [currentAddress] = await provider.request({
          method: "eth_requestAccounts",
        });

        if (currentAddress) {
          setAddress(currentAddress);
          provider.on("accountsChanged", (addresses: [string]) => {
            setAddress(addresses[0]);
          });
        }
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const handleMint = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = ETHTickets__factory.connect(
      config.contractAddress,
      signer
    );
    const supply = await contract.totalSupply();
  };

  return (
    <div>
      <h1>Web</h1>
      <h2>{address}</h2>
      <button onClick={handleConnect}>connect</button>
      <button onClick={handleMint}>Future Mint button</button>
    </div>
  );
}
