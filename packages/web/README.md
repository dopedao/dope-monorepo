# DOPE DAO Web

## The DOPE DAO DESKTOP

Contains the DOPEWARS.EXE desktop to view your loot, unbundle, generate Hustlers, and buy/sell.

### Features

1. uses `@emotion`: [emotion.sh](https://emotion.sh) for styling.
2. uses `typescript`
3. based on [next.js](https://nextjs.org/)

### Getting Started

```bash
yarn
yarn web dev
```

The application accepts the below environment variables, you WILL need to specify the network ID along with either a Curator ID or a Contract Address:

```bash
NEXT_PUBLIC_APP_TITLE=[default app title]
NEXT_PUBLIC_DEFAULT_DESCRIPTION=[default meta description]
NEXT_PUBLIC_BASE_URL=[production-url]
```

If you include a rpcUrl on the manage auction hooks provider it enables walletconnect,
without that rpcUrl walletconnect will not work work. We have set included and .env variable for this: `NEXT_PUBLIC_RPC_URL`. [Further reading on RPC providers](https://web3py.readthedocs.io/en/stable/providers.html) / [Alchemy Etherium API Docs](https://docs.alchemy.com/alchemy/documentation/apis/ethereum).

## Develop

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

...Don't forget to add the necessary environment variables!
