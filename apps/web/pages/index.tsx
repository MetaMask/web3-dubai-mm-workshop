import { getProvider } from "../lib/MetaMaskSdk";

export default function Web() {
  const handleConnect = () => {
    const provider = getProvider();
    if (typeof provider !== undefined) {
      provider.request({ method: "eth_requestAccounts" });
    }
  };
  return (
    <div>
      <h1>Web</h1>
      <button onClick={handleConnect}>connect</button>
    </div>
  );
}
