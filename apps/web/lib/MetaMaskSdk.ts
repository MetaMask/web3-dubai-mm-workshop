import MetaMaskSDK from "@metamask/sdk";

export const instantiateSdk = () => {
  if (typeof window === undefined) {
    return null;
  }

  new MetaMaskSDK();
};

// Should we be adding a useWallet or use MetaMask hook here 
// which could keep track of the contract and wallet information using context and reducer?
