import { getProvider } from "../lib/MetaMaskSdk";
import { ETHTickets__factory } from "blockchain";
import { config } from "../lib/config";
import { ethers } from "ethers";

export default function Web() {
  const handleConnect = () => {
    const provider = getProvider();
    if (typeof provider?.request !== undefined) {
      provider?.request({ method: "eth_requestAccounts" });
    }
  };

  const handleMint = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = ETHTickets__factory.connect(
      config.contractAddress,
      signer
    );
    contract
      .mintNFT
      // args here
      ();
  };
  return (
    <div>
      <h1>Web</h1>
      <button onClick={handleConnect}>connect</button>
    </div>
  );
}
