import { useMemo } from 'react';
import { css } from '@emotion/react';
import { Button } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { Paper__factory, Stockpile__factory } from '@dopewars/contracts';
import ItemRarities from 'dope-metrics/output/item-rarities.json';

import { Bag } from '../../src/generated/graphql';
import { NETWORK } from '../../common/constants';

const backgroundColors = [
  '#fff',
  '#fff',
  'rgba(18,171,23,0.15)',
  'rgba(46,130,255,0.15)',
  'rgba(254,101,33,0.15)',
  'rgba(249,40,255,0.25)',
  'rgba(255,252,63,0.5)',
];

const betterItemName = (name: string) => {
  const quotedIndex = name.lastIndexOf('"');
  if (quotedIndex !== -1) {
    const modifier = name.substr(0, quotedIndex + 1);
    const itemName = name.substr(quotedIndex + 1);
    return (
      <>
        <span
          css={css`
            margin-left: -0.9em;
            display: inline;
            font-size: 1.1em;
          `}
        >
          {modifier}
        </span>
        <br />
        <span
          css={css`
            display: inline;
            margin-top: 0.6em;
          `}
        >
          {itemName}
        </span>
      </>
    );
  }
  return name;
};

const Row = ({ color, slot, item }: { color: string; slot: string; item: string }) => (
  <div
    css={css`
      width: 100%;
      display: flex;
      border-bottom: 1px solid #dededd;
      div {
        padding: 12px 12px;
      }
    `}
  >
    <div
      css={css`
        color: rgb(26, 32, 44);
        width: 33%;
        text-align: right;
        border-right: 1px solid #dededd;
      `}
    >
      {slot}
    </div>
    <div
      css={css`
        width: 66%;
      `}
    >
      <span
        css={css`
          background-color: ${color};
          padding: 2px 4px;
          color: #000;
        `}
      >
        {betterItemName(item)}
      </span>
    </div>
  </div>
);

export const Loot = ({
  bag,
}: {
  bag: Pick<
    Bag,
    | 'id'
    | 'clothes'
    | 'drugs'
    | 'foot'
    | 'hand'
    | 'neck'
    | 'ring'
    | 'vehicle'
    | 'waist'
    | 'weapon'
    | 'claimed'
  >;
}) => {
  const { chainId, library } = useWeb3React();
  const paper = useMemo(
    () =>
      chainId
        ? Paper__factory.connect(NETWORK[chainId as 1 | 4].contracts.paper, library.getSigner())
        : null,
    [chainId],
  );
  const stockpile = useMemo(
    () =>
      chainId
        ? Stockpile__factory.connect(
            NETWORK[chainId as 1 | 4].contracts.stockpile,
            library.getSigner(),
          )
        : null,
    [chainId],
  );

  return (
    <div
      css={css`
        border: 2px solid #000;
        display: flex;
        flex-direction: column;
        background-color: #fff;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 32px;
          background: #dededd;
          border-bottom: 2px solid #000;
          box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25),
            inset 1px 1px 0px rgba(255, 255, 255, 0.25);
          font-size: 12px;
          font-weight: 600;
          position: 'sticky';
        `}
      >
        <div>Dope Wars Loot #{bag.id}</div>
      </div>
      <div
        css={css`
          flex: 1;
          background: #fff;
          padding-top: 0px;
          overflow-y: auto;
        `}
      >
        {[
          ['Weapon', bag.weapon],
          ['Vehicle', bag.vehicle],
          ['Drug', bag.drugs],
          ['Neck', bag.neck],
          ['Clothes', bag.clothes],
          ['Hands', bag.hand],
          ['Waist', bag.waist],
          ['Feet', bag.foot],
          ['Ring', bag.ring],
        ].map(slot => (
          <Row
            key={slot[0]}
            color={backgroundColors[(ItemRarities as { [name: string]: any })[slot[1]]]}
            slot={slot[0]}
            item={slot[1]}
          />
        ))}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          height: 44px;
          background: #dededd;
          border-top: 2px solid #000;
          padding: 0 16px;
          > button {
            margin-right: 10px;
          }
        `}
      >
        <Button
          disabled={bag.claimed}
          onClick={async () => {
            await paper.claimById(bag.id);
          }}
        >
          Claim Paper
        </Button>
        <Button
          disabled={true}
          onClick={async () => {
            await stockpile.open(bag.id);
          }}
        >
          Unbundle
        </Button>
      </div>
    </div>
  );
};

export default Loot;
