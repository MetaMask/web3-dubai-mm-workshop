# Web3 Dubai MetaMask Workshop (Follow Along)

## Prerequisites:
- NodeJS & NPM
- Code Editor
- Git & GitHub account 
- [MetaMask Extension](https://metamask.io/download) Installed
- Knowledge of JavaScript, TypeScript, and React (is a plus)
- Eagerness to learn NextJS, Solidity smart contracts, Truffle and Ganache

```bash
npm i truffle ganache -g
```

## Getting Started

Welcome to the Web3 Dubai Metamask Workshop. To get started, please clone the workshop repo on your machine and checkout the start branch:

```bash
git clone https://github.com/metamask/web3-dubai-mm-workshop && 
cd web3-dubai-mm-workshop && 
git checkout start && npm i
```

With our repo cloned and our dependencies installed, we should discuss our choices for the decisions and architecture of this web3 project.

- A mono repo using [Turbo](https://turbo.build/) 
    - Incremental bundler/build system optimized for mono repos, JS & TS
- Separating our `blockchain` and `web` projects
- [React](https://beta.reactjs.org) & [NextJS](https://nextjs.org/)
- [Truffle](https://trufflesuite.com) & [Ganache](https://trufflesuite.com/ganache/)

At this point, we have a solid framework to build Web3 applications. I would say that if you are a web2 developer just getting started with Web3 these tools should feel familiar, we are using ReactJS, JS, TS, and we have at the least dropped you off at the doorstep of a pretty solid way to build a full-stack web3 application all in one repo.

## Run Our NextJS Project

Let's ensure that our frontend NextJS project runs in dev mode. In a new terminal window run:

```bash
cd apps/web && npm run dev
```

If everything is working, you should see text that says, "Let's get started". For now, we can exit out of `next dev` and know that our NextJS frontend is ready when we need it.

If that is working fine, we can back up out of that directory because the next time we run the NextJS app, it will be from the root with our turbo scripts.

```bash
cd ../..
```

## Reviewing our Blockchain App

Rather than spend hours creating our Smart contract for our NFT Tickets, we have provided that for you in this `start` branch, and together we will go over it for the sake of time.

Review each in workshop: 
- `ETHTickets.sol`
- `HexStrings.sol`
- `1_initial_migration.js`

## Building and Running our Project

Let's first get our local blockchain environment up and running; we have several npm scripts to help us build and run our project locally. 

Let's build our contracts and generate types we can use in our NextJS app.

From the root of the project run:

```bash
npm run build
```

For running a local instance of Truffle and Ganache to generate accounts, and private keys for use in testing our Web3 app, let's open a separate terminal and run:

```bash
npm run local
```

The output from this command will give us some private keys, and we can take one of those private keys and import it into our MetaMask using the following network information:

- Network Name: Localhost 9545
- New RPC URL: http://localhost:9545
- Chain ID: 1337
- Currency Symbol: ETH
- Block explorer URL: we can leave this blank

For our Front-end we can open one more terminal window and run:

```bash
npm run dev
```

**Important**
We need to pay attention to the output of this command, and anytime we rerun this command, we will need to get the `contract address` and copy it into the `apps/web/lib/config` file.

All of the work, from this point, will be done in our `apps/web` directory. All dependencies we will rely on have already been installed:

## Connecting Users to MetaMask

We will first need to create a directory in `apps/web/components/` named `styledComponents` for styling our individual components and more general styles we could reuse throughout our application, like buttons, etc.

Inside the `styledComponents` directory we just created, we need a file named `navigation.js` with the following code:

```js
import styled from 'styled-components';

export const NavigationView = styled.div`
  padding: 1em;
  border-bottom: 1px solid #FFF;
  background-color: #265C8E;
  color: #FFF;
`;

export const Logo = styled.div`
  display: block;
  display: inline-block;
  line-height: 36px;
  height: 36px;
`

export const Balance = styled.div`
  display: inline-block;
  margin-left: 1em;
`

export const RightNav = styled.div`
  margin-left: auto;
  line-height: 36px;
  height: 36px;
  width: ${props => (props.widthPixel += "px") || "100%"};
`
```

Create: `general.js` with the following code:

```js
import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  align-self: flex-end;
  flex-direction: row;
  min-width: calc(100vw -2em);
  gap: ${props => props.gap || 0}em;
  row-gap: ${props => props.gap || 0}em;
`;

export const FlexItem = styled.div`
  width: ${props => props.widthPercent || 50}%;
`;

export const Button = styled.button`
  border-radius: 4px;
  border: none;
  background-color: #103164;
  color: #FFF;
  font-size: ${props => props.textSize || 16}px;
  text-transform: uppercase;
  padding: 1em 0.75em;
  display: inline-block;
  margin: 0 1em 0 0;
  cursor: pointer;
  cursor: hand;
  user-select: none;
  &:hover {
    background-color: #244982;
  }
  &:disabled {
    background-color: #244982;
    color: #7697C8;
    cursor: not-allowed;
  }
`
```

We first need to add a Navigation component and styles in the `apps/web/components` directory, create a page called `Navigation.tsx`, and add the following code:

```typescript
import Link from "next/link";

import { Button, FlexContainer, FlexItem, } from "./styledComponents/general";
import { NavigationView, Balance, RightNav, Logo } from "./styledComponents/navigation";
import { SiEthereum } from 'react-icons/si';

export default function Navigation() {

  return (
    <NavigationView>
      <FlexContainer>
        <FlexItem widthPercent={50}>
          <Logo>
            <SiEthereum /> ETH Atlantis
          </Logo>
        </FlexItem>
        <FlexItem widthPercent={50}>
          <RightNav widthPixel={300}>
            <span>MM CONNECT BUTTON</span>
          </RightNav>
        </FlexItem>
      </FlexContainer>
    </NavigationView>
  );
}
```

With the Styles and basic navigation skeleton in place, we need to update our `pages/index.tsx` inside our web app.

Update `pages/index.tsx` and replace the `<div>Let's get started</div>` with a link to the Navigation component:

```typescript
import type { NextPage } from "next";
import Head from 'next/head';

import Navigation from '../components/Navigation'

const Mint: NextPage = () => {

  return (
    <div className="mint-tickets">
      <Head>
        <title>ETH Atlantis 2022</title>
        <meta property="og:title" content="The largest underwater Ethereum event in history" key="title" />
      </Head>

      <Navigation />
    </div>
  );
};

export default Mint;
```

We should see our navigation in the top right corner. We need to replace the text that says "MM CONNECT BUTTON". But first, we need to set up two React hooks to listen and provide context for our connected user. Create a new directory in the web app under `apps/web/hooks` and add the two files and we will go over them:

Add a file named `useListen.tsx` with the following code:

```typescript
import { useMetaMask } from "./useMetaMask";

export const useListen = () => {
  const { dispatch } = useMetaMask();

  return () => {
    window.ethereum.on("accountsChanged", async (newAccounts: string[]) => {
      if (newAccounts.length > 0) {
        // uppon receiving a new wallet, we'll request again the balance to synchronize the UI.
        const newBalance = await window.ethereum!.request({
          method: "eth_getBalance",
          params: [newAccounts[0], "latest"],
        });

        dispatch({
          type: "connect",
          wallet: newAccounts[0],
          balance: newBalance,
        });
      } else {
        // if the length is 0, then the user has disconnected from the wallet UI
        dispatch({ type: "disconnect" });
      }
    });
  };
};
```

Add a file named `useMetaMask.tsx` with the following code:

```typescript
import React, { type PropsWithChildren } from "react";

type ConnectAction = { type: "connect"; wallet: string; balance: string };
type DisconnectAction = { type: "disconnect" };
type PageLoadedAction = {
  type: "pageLoaded";
  isMetaMaskInstalled: boolean;
  wallet: string | null;
  balance: string | null;
};
type LoadingAction = { type: "loading" };
type IdleAction = { type: "idle" };

type Action =
  | ConnectAction
  | DisconnectAction
  | PageLoadedAction
  | LoadingAction
  | IdleAction;

type Dispatch = (action: Action) => void;

type Status = "loading" | "idle" | "pageNotLoaded";

type State = {
  wallet: string | null;
  isMetaMaskInstalled: boolean;
  status: Status;
  balance: string | null;
};

const initialState: State = {
  wallet: null,
  isMetaMaskInstalled: false,
  status: "loading",
  balance: null,
} as const;

function metamaskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "connect": {
      const { wallet, balance } = action;
      const newState = { ...state, wallet, balance, status: "idle" } as State;
      const info = JSON.stringify(newState);
      window.localStorage.setItem("metamaskState", info);

      return newState;
    }
    case "disconnect": {
      window.localStorage.removeItem("metamaskState");
      if (typeof window.ethereum !== undefined) {
        window.ethereum.removeAllListeners(["accountsChanged"]);
      }
      return { ...state, wallet: null, balance: null };
    }
    case "pageLoaded": {
      const { isMetaMaskInstalled, balance, wallet } = action;
      return { ...state, isMetaMaskInstalled, status: "idle", wallet, balance };
    }
    case "loading": {
      return { ...state, status: "loading" };
    }
    case "idle": {
      return { ...state, status: "idle" };
    }

    default: {
      throw new Error("Unhandled action type");
    }
  }
}

const MetaMaskContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function MetaMaskProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState);
  const value = { state, dispatch };

  return (
    <MetaMaskContext.Provider value={value}>
      {children}
    </MetaMaskContext.Provider>
  );
}

function useMetaMask() {
  const context = React.useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error("useMetaMask must be used within a MetaMaskProvider");
  }
  return context;
}

export { MetaMaskProvider, useMetaMask };
```

These files respectively listen for changes in the user's connection to Metamask and set up a context provider for sharing the wallet state to the components in our app and we can go over each one in the workshop to give more explanation.

With those files in place, we wire up our connect, disconnect, and display basic balance information from our connected user.

Let's go back to our Navigation component and update it to import these hooks and get everything working:

In the `Navigation.tsx` file, update to the following code:

```typescript
import Link from "next/link";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";

import { Button, FlexContainer, FlexItem, } from "./styledComponents/general";
import { NavigationView, Balance, RightNav, Logo } from "./styledComponents/navigation";
import { SiEthereum } from 'react-icons/si';

export default function Navigation() {
  const {
    dispatch,
    state: { status, isMetaMaskInstalled, wallet, balance },
  } = useMetaMask();
  const listen = useListen();

  const showInstallMetaMask =
    status !== "pageNotLoaded" && !isMetaMaskInstalled;
  const showConnectButton =
    status !== "pageNotLoaded" && isMetaMaskInstalled && !wallet;

  const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";

  const handleConnect = async () => {
    dispatch({ type: "loading" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      dispatch({ type: "connect", wallet: accounts[0], balance });

      // we can register an event listener for changes to the user's wallet
      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnect" });
  };

  const formatAddress = (addr: string) => {
    return `${addr.substr(0, 6)}...${addr.substr(-4)}`
  }

  return (
    <NavigationView>
      <FlexContainer>
        <FlexItem widthPercent={50}>
          <Logo>
            <SiEthereum /> ETH Atlantis
          </Logo>
        </FlexItem>
        <FlexItem widthPercent={50}>
          <RightNav widthPixel={300}>
            {showConnectButton && (
              <Button textSize={10} onClick={handleConnect}>
                {status === "loading" ? "loading..." : "Connect Wallet"}
              </Button>
            )}
            {showInstallMetaMask && (
              <Link href="https://metamask.io/" target="_blank">
                Install MetaMask
              </Link>
            )}
            {wallet && balance && (
              <>
                {isConnected && <Button textSize={10} onClick={handleDisconnect}>Disconnect</Button>}
                <a
                  className="text_link tooltip-bottom"
                  href={`https://etherscan.io/address/${wallet}`} target="_blank"
                  data-tooltip="Open in Etherscan"
                >
                  {formatAddress(wallet)}
                </a>
                <Balance>
                  {(parseInt(balance) / 1000000000000000000).toFixed(2)}{" "}ETH
                </Balance>
              </>
            )}
          </RightNav>
        </FlexItem>
      </FlexContainer>
    </NavigationView>
  );
}
```

We will review our changes in the workshop and cover what all of this achieves.

At this point, we are getting an error because we have not wrapped the app with a provider; let's go to the `apps/web/pages/_app.tsx` file and add our MetaMask provider.

In `_app.tsx` update the code to the following:

```typescript
import 'normalize.css'
import '../styles/globals.scss'

import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { MetaMaskProvider } from "../hooks/useMetaMask";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MetaMaskProvider>
  );
}

export default MyApp;
```

We need to make two more changes, one to our `apps/web/components/Layout.tsx` as this code will determine `isMetaMaskInstalled` if the Ethereum provider exists or is undefined and dispatch the proper actions to our context's reducers. 

In the `Layout.tsx` file update the code to the following: 

```typescript
import { PropsWithChildren, useEffect } from "react";
import { useListen } from "../hooks/useListen";
import { useMetaMask } from "../hooks/useMetaMask";
import { instantiateSdk } from "../lib/MetaMaskSdk";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { dispatch } = useMetaMask();
  const listen = useListen();

  useEffect(() => {
    if (typeof window !== undefined) {
      // start by checking if window.ethereum is present, indicating a wallet extension
      const ethereumProviderInjected = typeof window.ethereum !== "undefined";
      // this could be other wallets so we can verify if we are dealing with metamask
      // using the boolean constructor to be explecit and not let this be used as a falsy value (optional)
      const isMetaMaskInstalled =
        ethereumProviderInjected && Boolean(window.ethereum.isMetaMask);

      const local = window.localStorage.getItem("metamaskState");

      // user was previously connected, start listening to MM
      if (local) {
        listen();
      }

      // local could be null if not present in LocalStorage
      const { wallet, balance } = local
        ? JSON.parse(local)
        : // backup if local storage is empty
          { wallet: null, balance: null };

      instantiateSdk();
      dispatch({ type: "pageLoaded", isMetaMaskInstalled, wallet, balance });
    }
  }, []);

  return (
    <div className="app-container">
      {children}
    </div>
  );
};
```

Finally, we need to add a new file to the `apps/web/lib` directory called `MetaMaskSdk.ts`.

Once you have created that file, please add the following code:

```typescript
import MetaMaskSDK from "@metamask/sdk";

export const instantiateSdk = () => {
  if (typeof window === undefined) {
    return null;
  }

  new MetaMaskSDK();
};
```

With this in place, our connect, display, and disconnect functionality should work. Let's run our app and try it out. We should now get the option to install if we don't have the MetaMask extension, connect if we do, display balance if we are connected, and disconnect if we wish.

## Add Tickets and Minting

Since our app is based on showing the type of tickets available and allowing the user to mint those tickets, we will be adding components directly to the `apps/web/pages/index.ts` page.

We will first add an array of objects that represent the types of tickets we want to allow users to mint along with their kind (GA & VIP), Event Name, and Price in ETH using both the basic and hex version of this price. Why both, we want to display the value as well we need the hex value to send to our contract.

On the `index.tx` page. Lets import the `ethers` (a library for interacting with Ethereum) import just above the Navigation import:

```typescript
import { ethers } from "ethers";

import Tickets from "../components/tickets/Tickets";
import Navigation from '../components/Navigation';
```

Next, just under the Mint component declaration add the following code (at line number 8):

```typescript
  // Get ETH as a small number ("0.01" => "10000000000000000")
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
```

Finally, we will add the actual `<Ticket/>` component and pass this tickets array to it, just underneath the `<Navigation/>` component, add the following code, and until we get that page working, we can just comment it out: 

```typescript
      <Tickets tickets={tickets} />
```

Now we will create a directory named `tickets` inside `apps/web/components` and add a file named `Tickets.tsx` with the following code:

```typescript
import { useState } from "react";

import { SiEthereum } from 'react-icons/si';

import { Button, FlexContainer, FlexItem, } from "../styledComponents/general";
import { TicketsView, TicketType, TicketTypeText, StyledAlert } from "../styledComponents/tickets";

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

const TicketTypes: React.FC<Ticket> = ({
  type, event, description, price, priceHexValue,
}) => {

  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <FlexItem>
      <TicketType>
        <TicketTypeText>{description}</TicketTypeText>
        <p>{event}</p>
        <Button disabled={isMinting}>
          <SiEthereum /> {isMinting ? 'Minting...' : 'Mint'} Ticket
        </Button>
        {
          error && (
            <StyledAlert onClick={() => setError(false)}>
              <span>
                <strong>Error:</strong> {errorMessage}
              </span>
            </StyledAlert>
          )
        }
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
          <TicketTypes key={ticket.type} {...ticket} />
        ))}
      </FlexContainer>
    </TicketsView>
  );
};

export default Tickets;
```

With this in place, we need to add the styled components for the Tickets page, which I have already created and will help to render our page with some style.

In the `apps/web/components/styledComponents` directory, create a page called `tickets.js` and add the following code:

```js
import styled from 'styled-components';

export const TicketsView = styled.div`
  padding: 1em;
`;

export const TicketType = styled.div`
  border-radius: 10px;
  height: 220px;
  padding: 0.01em 1em;
  background-color: #4A7CB1;
  color: #BDCFE2;
  user-select: none;
  -webkit-box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
  -moz-box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
  box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
`;

export const TicketTypeText = styled.h2`
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #C5ECFF, #8BD8FF);
  background-size: 90%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
`

export const StyledAlert = styled.div`
  border-radius: 5px;
  padding: 0.5em;
  font-size: 10px;
  height: 40px;
  width: 100%;
  word-break: break-word;
  margin: 0.5em 0;
  background-color: #244982;
  strong {
    color: #E2761B;
  }
`
```

With all of this in place, we should see our ticket types show up with minting buttons (that do not work yet) on the page if we navigate to our app on `localhost:3000`.

## Adding Minting Functionality to TicketType Component

With our ticket types in place, we are ready to sell out our event to ETH Atlantis. We need to add some additional code to our `Tickets.tsx` page, allowing us to interact with our smart contract. If, for any reason, you have killed your `npm run local` or `npm run dev` processes in the terminal now is a time to get those running and ensure your `config.ts` file has the correct contract address added.

When we are done with this next section, we should be able to call our contract's `mintNFT` function and get some initial feedback indicating our minting process is working in our dApp.

In the `Tickets.tsx` page, we need to add a few more imports directly above the existing imports we have already added:

```typescript
import { useState } from "react";
import { useRouter } from "next/router";
import { useMetaMask } from "../../hooks/useMetaMask";
import { ETHTickets__factory } from "blockchain";
import { ethers } from "ethers";
import { config } from "../../lib/config";

import { SiEthereum } from 'react-icons/si';

import { Button, FlexContainer, FlexItem, } from "../styledComponents/general";
import { TicketsView, TicketType, TicketTypeText, StyledAlert } from "../styledComponents/tickets";
```

These imports will give us access to our connected wallet state, the NextJS router so the we can force a page refresh (only after a successful mint), access to our smart contract through the `ETHTickets__factory` created by our build which utilizes typechain, the ethers library to get provider and signer for interacting with the blockchain via our contracts methods and the config file that knows the contract address.

Starting on line 28 of the `Tickets.tsx` file inside our `TicketsType` component, we need to destructure our wallet state returned by a call to `useMetaMask()` hook as well define a router with a call to the NextJS `useRouter()` hook, update that code with the following:

```typescript
  const { state: { wallet }, } = useMetaMask();
  const router = useRouter();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
```

Directly below the code just added we need to add a function called `mintTicket()`, add the following code just above the return statement in the `TicketsType` component:

```typescript
const mintTicket = async () => {
    setIsMinting(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // In ethers.js, providers allow you to query data from the blockchain. 
    // They represent the way you connect to the blockchain. 
    // With them you can only call view methods on contracts and get data from those contract.
    // Signers are authenticated providers conected to the current address in MetaMask.
    const signer = provider.getSigner();

    const factory = new ETHTickets__factory(signer);
    const nftTickets = factory.attach(config.contractAddress);

    nftTickets
      .mintNFT({
        from: wallet!,
        value: priceHexValue,
      })
      .then(async (tx: any) => {
        console.log('minting accepted')
        await tx.wait(1);
        console.log(`Minting complete, mined: ${tx}`);
        setIsMinting(false);
        router.reload()
      })
      .catch((error: any) => {
        console.log(error);
        setError(true);
        setErrorMessage(error?.message);
        setIsMinting(false);
      })
  };
```

We will discuss the function we just added in the workshop.

Finally, we will update the button inside the `TicketsType` component's JSX and add a call to the `mintTicket()` function:

```typescript
        <Button disabled={isMinting} onClick={mintTicket}>
```

Our `mintTicket()` function has a few strategically placed `console.log()` statements so that we can tell if our minting button is working. At this point, if we are connected to the dApp with a MetaMask wallet that has some ETH in it, we can test those buttons out. Ensure you have your developer tools in your browser open to the console so we can see those logs once we mint. (comment out the `router.reload()` statement to ensure we can see the console messages and uncomment once we are sure it is working).

We should see:
```bash
minting accepted
Tickets.tsx?cd6d:55 Minting complete, mined: 0x......
```

With the minting now working we are ready to make our last set of changes to display the connected wallet's minted NFTs.

## Add TicketsOwned Component to Minting Page

First we need to add the styles we will need to display our minted NFTs in a grid at the bottom of the page. Create a new file in the `apps/web/components/styledComponents` directory named `ticketsOwned.js` and add the following code:

```js
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, ${props => props.columnWidth}px);
  grid-template-rows: repeat(${props => props.itemWidth || "300"}px);
`;

export const SvgItem = styled.div`
  width: 300px;
  padding: ${props => props.pad || 0}px;
`;
```

In the `apps/web/pages/index.tsx` file we need to add one final component named `<TicketsOwned />`. 

Create a file named `TicketsOwned.tsx` inside the `apps/web/components` directory. Since we have already reviewed code that gets our signer, provider, wallet state, etc. and since we have to repeat some of that same code on this page, we are just going to add all the code needed to display our minted NFT ticket SVGs in one shot and then talk about everything we have added.

In `TicketsOwned.tsx`, add the following code:

```typescript
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Image from "next/image";

import { ETHTickets__factory } from "blockchain";
import { config } from "../../lib/config";
import { useMetaMask } from "../../hooks/useMetaMask";

import { Grid, SvgItem } from "../styledComponents/ticketsOwned";

type NftData = {
  name: string,
  description: string,
  attributes: { trait_type: any, value: any }[],
  owner: string,
  image: string
};

type TicketFormated = {
  tokenId: string
  svgImage: string
  ticketType:
  { trait_type: any, value: any }
};

const TicketsOwned = () => {
  const [ticketCollection, setTicketCollection] = useState<TicketFormated[]>([]);
  const { state: { wallet: address }, } = useMetaMask();

  useEffect(() => {
    if (typeof window !== "undefined" && address !== null) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const factory = new ETHTickets__factory(signer);
      const nftTickets = factory.attach(config.contractAddress);

      const ticketsRetrieved: TicketFormated[] = [];

      nftTickets.walletOfOwner(address).then((ownedTickets) => {
        const promises = ownedTickets.map(async (t) => {
          const currentTokenId = t.toString();
          const currentTicket = await nftTickets.tokenURI(currentTokenId);

          const base64ToString = window.atob(
            currentTicket.replace("data:application/json;base64,", "")
          );
          const nftData: NftData = JSON.parse(base64ToString);

          ticketsRetrieved.push({
            tokenId: currentTokenId,
            svgImage: nftData.image,
            ticketType: nftData.attributes.find(
              (t) => t.trait_type === "Ticket Type"
            ),
          } as TicketFormated);
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
```

At this point, each time you mint a new ticket, you should see them displayed as SVG at the bottom of the screen in a grid format. These are the exact NFTs your users will be minting and we are getting the SVG images directly from the deployed smart contract using the `generateNftSvgByTokenId()` method in our contract which takes a tokenId and builds the SVG just like the version it saves onchain to the ethereum blockchain.

This concludes the instructional portion of the workshop, we would love you to continue working on this project and adding your own features, iterating on the UI, adding better error handling, create tests and even deploy to a testnet. The MetaMask DevRel team can be contaced on Twitter Eric Bishard at [@httpJunkie](https://twitter.com/httpjunkie) and Guillaume Bibeau at [@GuiBibeau](https://twitter.com/httpjunkie/GuiBibeau) if you have questions or comments regarding the code or workshop!