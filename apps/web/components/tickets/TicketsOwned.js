import { useState, useEffect } from "react";
import { ETHTickets__factory } from "blockchain";
import { config } from "../../lib/config";
import Image from "next/image";
import styled from "styled-components";
import { ethers } from "ethers";
import { useMetamask } from "../../hooks/useMetamask";

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 166px);
  grid-template-rows: repeat(150px);
  /* border: 1px solid blue; */
`;
const SvgItem = styled.div`
  width: 150px;
  padding: 8px;
  cursor: pointer;
  &:hover img {
    opacity: 0.5;
  }
  /* border: 1px solid red; */
`;

const TicketsOwned = () => {
  const [ticketCollection, setTicketCollection] = useState([]);
  const {
    state: { wallet: address },
  } = useMetamask();

  useEffect(() => {
    if (typeof window !== "undefined" && address !== null) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ETHTickets__factory(signer);
      const nftTickets = factory.attach(config.contractAddress);

      nftTickets.MAX_SUPPLY().then(console.log);

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
    <SvgItem key={`ticket${ticket.tokenId}`}>
      <Image
        src={ticket.svgImage}
        width={300}
        height={300}
        alt={`Ticket# ${ticket.tokenId}`}
      />
    </SvgItem>
  ));

  return (
    <>
      {/* <hr height="1" />
      {ownedTickets.length > 0 ? (
        <>
          <div>
            You have {ownedTickets.length} ticket
            {ownedTickets.length > 1 ? "s" : ""}, click to view on OpenSea!
          </div>
          <Wrap>{listOfTickets}</Wrap>
        </>
      ) : null} */}
      <Wrap>{listOfTickets}</Wrap>
    </>
  );
};

export default TicketsOwned;
