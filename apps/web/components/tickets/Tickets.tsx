import { useState } from "react";
import { useMetaMask } from "../../hooks/useMetaMask";
import { ETHTickets__factory } from "blockchain";
import { ethers } from "ethers";
import { config } from "../../lib/config";
import { useRouter } from "next/router";

import { SiEthereum } from 'react-icons/si';

import { Button, FlexContainer, FlexItem, } from "../styledComponents/general";
import { TicketsView, TicketType, TicketTypeText } from "../styledComponents/tickets";

interface Ticket {
  type: string;
  event: string;
  description: string;
  price: string;
  priceHexValue: string;
}
interface TicketsProps {
  tickets: Ticket[];
}

const TicketCategoryDetail: React.FC<Ticket> = ({
  type,
  event,
  description,
  price,
  priceHexValue,
}) => {
  const {
    state: { wallet },
  } = useMetaMask();
  const { reload } = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mintTicket = async () => {
    setIsMinting(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const factory = new ETHTickets__factory(signer);
    const nftTickets = factory.attach(config.contractAddress);

    nftTickets
      .mintNFT({
        from: wallet!,
        value: priceHexValue,
      })
      .then(async (tx: any) => {
        await tx.wait();
        console.log(`Minting complete, mined: ${tx}`);
        setIsMinting(false);
      })
      .catch((error: any) => {
        console.error(error);
        setError(true);
        setErrorMessage(error?.message);
        setIsMinting(false);
      })
      .finally(reload);
  };
  return (
    <FlexItem>
      <TicketType>
        <TicketTypeText>{event}</TicketTypeText>
        <p>{description}</p>
        <Button onClick={mintTicket}><SiEthereum /> Mint Ticket</Button>
      </TicketType>
    </FlexItem>
  );
};

const Tickets = ({ tickets }: TicketsProps) => {
  return (
    <TicketsView>
      <h1>Ticket Types</h1>
      <FlexContainer gap={1}>
        {tickets.map((ticket) => (
          <TicketCategoryDetail key={ticket.type} {...ticket} />
        ))}
      </FlexContainer>
    </TicketsView>
  );
};

export default Tickets;
