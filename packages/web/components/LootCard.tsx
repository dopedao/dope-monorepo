import { useMemo } from 'react';
import { css } from '@emotion/react';
import { Button } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { Paper__factory, Stockpile__factory } from '@dopewars/contracts';
import ItemRarities from 'dope-metrics/output/item-rarities.json';

import { Bag } from '../src/generated/graphql';
import { NETWORK } from '../common/constants';

const colors = ['#000', '#838383', '#00DC82', '#2e82ff', '#c13cff', '#f8b73e', '#ff4444'];

const Row = ({ color, slot, item }: { color: string; slot: string; item: string }) => (
  <div
    css={css`
      color: ${color};
      height: 34px;
      border-bottom: 1px solid #dededd;
      font-size: 13px;
      display: flex;
      align-items: center;
    `}
  >
    <span
      css={css`
        color: #4b4b4b;
        width: 65px;
        text-align: right;
      `}
    >
      {slot}
    </span>
    <span
      css={css`
        color: #e5e5e4;
        margin-right: 8px;
      `}
    >
      :
    </span>
    <span>{item}</span>
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
        height: 640px;
        width: 500px;
        background-color: #fff;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 34px;
          background: #dededd;
          border-bottom: 2px solid #000;
          box-shadow: inset -3px -3px 0px rgba(0, 0, 0, 0.25),
            inset 3px 3px 0px rgba(255, 255, 255, 0.25);
          font-size: 13px;
          font-weight: 600;
        `}
      >
        Dope Wars Loot #{bag.id}
      </div>
      <div
        css={css`
          flex: 1;
          background: #fff;
          margin: 12px 16px;
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
            color={colors[(ItemRarities as { [name: string]: any })[slot[1]]]}
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
          onClick={async () => {
            await stockpile.open(bag.id);
          }}
        >
          Unbundle
        </Button>
        <Button
          disabled={bag.claimed}
          onClick={async () => {
            await paper.claimById(bag.id);
          }}
        >
          Claim Paper
        </Button>
      </div>
    </div>
  );
};

export default Loot;
