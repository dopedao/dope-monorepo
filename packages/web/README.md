# DOPE DAO Web

## The DOPE DAO DESKTOP

Contains the DOPEWARS.EXE desktop to view your DOPE, Claim Gear, generate Hustlers, and buy/sell.

### Features

1. uses `@emotion`: [emotion.sh](https://emotion.sh) for styling.
2. uses `typescript`
3. based on [next.js](https://nextjs.org/)

### Getting Started

```bash
yarn
yarn web dev
```

## Develop

First, create an `.env` file and paste in the following env variable:

```bash
NEXT_PUBLIC_DOPEWARS_API=https://testnet.api.dopewars.gg/query
```

Second, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

...Don't forget to add the necessary environment variables!
