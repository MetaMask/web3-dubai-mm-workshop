import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";

export const instantiateSdk = () => {
  if (typeof window === undefined) {
    return null;
  }

  new MetaMaskSDK();
};
