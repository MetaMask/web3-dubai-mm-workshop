# Web3 Dubai MetaMask Workshop (Follow Along)

## Prerequisites:
- NodeJS & NPM
- Code Editor
- Git & GitHub account 
- Knowledge of JavaScript, TypeScript and React (is a plus)
- Eagerness to learn NextJS, Solidity smart contracts, Truffle and Ganache

## Getting Started

Welcome to the Web3 Dubai Metamask Workshop, to get started, please clone the workshop repo on your machine and checkout the start branch:

```bash
git clone https://github.com/metamask/web3-dubai-mm-workshop && 
cd web3-dubai-mm-workshop && 
git checkout start && npm i
```

With our repo cloned and our dependencies installed we should take minute to discuss our choices for the decisions and architecture of this web3 project.

- A mono repo using [Turbo](https://turbo.build/) 
    - Incremental bundler/build system optimized for mono repos, JS & TS
- Seperating our `blockchain` and `web` projects
- [React](https://beta.reactjs.org) & [NextJS](https://nextjs.org/)
- [Truffle](https://trufflesuite.com) & [Ganache](https://trufflesuite.com/ganache/)

At this point, we have a pretty solid framework to build Web3 applications with, is it a bit opinionated, yes, is it different? I would say that if you are a web2 developer just getting started with Web3 these tools should feel familliar, we are using ReactJS, JS & TS and we have at the least dropped you off at the doorstep of a pretty solid way to build a fullstack web3 application all in one repo.

## Run Our NextJS Project

Let's really quickly just ensure that our frontend NextJS project is running in dev mode. In a new terminal window:

```bash
cd apps/web && npm run dev
```

If everything is working you should see text that says "Let's get started". For now we can exit out of `next dev` and know that our NextJS frontend is ready when we need it.

## Reviewing our Blockchain App

Rather than spend hours creating our Smart contract for our NFT Tickets, we have provided that for you in the `start` branch and together we will go over it line by line for the sake of time.

Review `ETHTickets.sol`, `HexStrings.sol` and `1_initial_migration.js`

## Building and Running our Project

Let's first get our local blockchain environment up and running, we have several npm scripts setup to help us build and run our project locally. 

For compiling our contracts and generating types from our smart contracts that we can use in our NextJS app.
```bash
npm run build
```

For running a local instance of Truffle and Ganache to generate accounts, private keys for use in testing our Web3 app
```bash
npm run local
```

For running our Frontent locally
```bash
npm run dev
```

In one terminal window let's run `npm run build` and in another `npm run local`.