import MetaMaskSDK from "@metamask/sdk";
import { ethers } from "ethers";

export const getProvider = () => {
  if (typeof window === undefined) {
    return null;
  }

  const MMSDK = new MetaMaskSDK();

  return MMSDK.getProvider();
};
