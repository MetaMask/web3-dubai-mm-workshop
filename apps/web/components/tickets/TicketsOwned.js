import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";

import { ETHTickets__factory } from "blockchain";
import { config } from "../../lib/config";
import { useMetaMask } from "../../hooks/useMetaMask";

import { Grid, SvgItem } from "../styledComponents/ticketsOwned";

const TicketsOwned = () => {
  const [ticketCollection, setTicketCollection] = useState([]);
  const { state: { wallet: address }, } = useMetaMask();

  useEffect(() => {
    if (typeof window !== "undefined" && address !== null) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ETHTickets__factory(signer);
      const nftTickets = factory.attach(config.contractAddress);

      const ticketsRetrieved = [];

      nftTickets.walletOfOwner(address).then((ownedTickets) => {
        const promises = ownedTickets.map(async (t) => {
          const currentTokenId = t.toString();
          let currentTicket = await nftTickets.tokenURI(currentTokenId);
          let base64ToString = window.atob(
            currentTicket.replace("data:application/json;base64,", "")
          );
          base64ToString = JSON.parse(base64ToString);

          ticketsRetrieved.push({
            tokenId: currentTokenId,
            svgImage: base64ToString.image,
            ticketType: base64ToString.attributes.find(
              (x) => x.trait_type === "Ticket Type"
            ),
          });
        });
        Promise.all(promises).then(() => setTicketCollection(ticketsRetrieved));
      });
    }
  }, [address]);

  let listOfTickets = ticketCollection.map((ticket) => (
    <SvgItem pad={4} key={`ticket${ticket.tokenId}`}>
      <Image 
        width={300} 
        height={300}
        src={ticket.svgImage} 
        alt={`Ticket# ${ticket.tokenId}`}
      />
    </SvgItem>
  ));

  return (
    <>
      <hr />
      <Grid columns={3} itemWidth={300} columnWidth={308}>{listOfTickets}</Grid>
    </>
  );
};

export default TicketsOwned;
