# Generator

Forked from https://github.com/Anish-Agnihotri/merkle-airdrop-starter

Given a `decimals` count for a token and list of airdrop recipients, outputs:

1. A merkle root for use in a MerkleClaimERC20 contract
2. A merkle tree for use in a front-end

## Run locally

```bash
# Navigate to generator directory, if not already there
cd generator/

# Install dependencies
npm install

# Edit config.json
vim config.json

# Run script
npm run start
```

Outputs a `merkle.json`, in the following format:

```json
{
  "root": "0x6a0b89fc219e9e72ad683e00d9c152532ec8e5c559600e04160d310936400a00",
  "tree": {
    "duplicateOdd": false,
    "hashLeaves": false,
    "isBitcoinTree": false,
    "leaves": [
      ...
    ],
    "layers": [
      [...],
      [...]
    ],
    "sortLeaves": false,
    "sortPairs": true,
    "sort": false,
    "fillDefaultHash": null
  }
}
```

```sql
select count(wallet_items) as count, wallet_items as address from wallet_items w LEFT JOIN items i on w.item_wallets = i.id where i."type" = 'WEAPON' group by address
select count(wallet_hustlers) as count, wallet_hustlers as address from hustlers where item_hustler_clothes > '0' group by address
```