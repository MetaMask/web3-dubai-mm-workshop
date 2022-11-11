import { useState, useEffect } from 'react'
import { getProvider } from "../../lib/MetaMaskSdk"
import { ETHTickets__factory } from "blockchain"
import { config } from "../../lib/config"
import Image from 'next/image'
import styled from 'styled-components'
import { ethers } from "ethers"
import { info } from 'console'

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 166px);
  grid-template-rows: repeat(150px);
  /* border: 1px solid blue; */
`
const SvgItem = styled.div`
  width: 150px;
  padding: 8px;
  cursor: pointer;
  &:hover img {
    opacity:0.5
  }
  /* border: 1px solid red; */
`

const TicketsOwned = () => {
  const address = '0x568820334111ba2a37611F9Ad70BD074295D44C5'
  // const { user, nfTickets, provider } = useContext(ViewContext)
  // const { address } = user
  const [provider, setProvider] = useState({})
  const [ownedTickets, setOwnedTickets] = useState([])
  const [ticketCollection, setTicketCollection] = useState([])

  const contract = ETHTickets__factory.connect(
    config.contractAddress,
    signer
  )

  const getOwnedTickets = async () => {
    let mintedTickets = await contract.walletOfOwner(address)
    setOwnedTickets(mintedTickets)
  }

  useEffect(() => {
    setProvider(new ethers.providers.Web3Provider(window.ethereum))
  }, []);

  useEffect(() => {
    if (provider) {
      provider.on('block', getOwnedTickets)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider])
  
  useEffect(() => {
    if (provider) {
      let ticketsRetrieved = []
      if(ownedTickets.length > 0) {
        const promises = ownedTickets.map(async(t) => {
          const currentTokenId = t.toString()
          let currentTicket = await nfTickets.tokenURI(currentTokenId)
          let base64ToString = window.atob(currentTicket.replace('data:application/json;base64,', ''))
          base64ToString = JSON.parse(base64ToString)
  
          ticketsRetrieved.push({
            tokenId: currentTokenId,
            svgImage: base64ToString.image,
            ticketType: base64ToString.attributes.find((x) => x.trait_type === "Ticket Type"),
          })
        })
        Promise.all(promises).then(() => setTicketCollection(ticketsRetrieved))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownedTickets])

  let listOfTickets = ticketCollection.map(ticket =>
    <SvgItem key={`ticket${ticket.tokenId}`}>
      <Image src={ticket.svgImage} width={150} alt={`Ticket# ${ticket.tokenId}`} />
    </SvgItem>
  )

  return (
    <>
      <hr height="1" />
      { ownedTickets.length > 0
        ? <>
            <div>You have {ownedTickets.length} ticket{ownedTickets.length > 1 ? 's' : ''}, click to view on OpenSea!</div>
            <Wrap>{listOfTickets}</Wrap>
          </>
        : null
      }
    </>
  )
}

export default TicketsOwned
