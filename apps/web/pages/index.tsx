import type { NextPage } from "next";
import Head from 'next/head';
import { ethers } from "ethers";

import Tickets from "../components/tickets/Tickets";
import TicketsOwned from "../components/tickets/TicketsOwned";

import WalleButton from "../components/WalletButton";

const Mint: NextPage = () => {
  // Get ETH as small number ("0.01" => "10000000000000000")
  const bigNumberify = (amt: string) => ethers.utils.parseEther(amt);

  const ethGa = "0.01";
  const ethVip = "0.02";
  const ethGaHex = bigNumberify(ethGa)._hex;
  const ethVipHex = bigNumberify(ethVip)._hex;
  const tickets = [
    {
      type: "ga",
      event: "ETH Atlantis",
      description: "General Admission Ticket",
      price: ethGa,
      priceHexValue: ethGaHex, // '0x2386f26fc10000' *eserialize.com
    },
    {
      type: "vip",
      event: "ETH Atlantis",
      description: "VIP Ticket",
      price: ethVip,
      priceHexValue: ethVipHex, // '0x470de4df820000' *eserialize.com
    },
  ];

  return (
    <>
      <Head>
        <title>ETH Atlantis 2022</title>
        <meta property="og:title" content="The largest underwater Ethereum event in history" key="title" />
      </Head>

      <WalleButton />
      <Tickets tickets={tickets} />
      <TicketsOwned />
    </>
  );
};

export default Mint;
