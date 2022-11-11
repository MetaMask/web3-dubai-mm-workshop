import Link from 'next/link'

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

const Tickets = ({ tickets }: TicketsProps) => {
console.log(tickets)
  let nftGrid = tickets.map((ticket, i) =>
    <div className="nft-card" key={`ticket${i}`}>
      <Link className='text_link' href={`/mint/${ticket.type}`}>
        {ticket.event}
      </Link>
      <div>{ticket.description}</div>
    </div>
  )

  return (
    <>
      <h1>Tickets Available</h1>
      <div className="nft-grid">
        {nftGrid}
      </div>
    </>
  )
}

export default Tickets