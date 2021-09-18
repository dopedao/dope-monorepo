import { css } from '@emotion/react';
import { Button } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { Paper__factory, Stockpile__factory } from '@dopewars/contracts';

import { Bag } from '../src/generated/graphql';

const Row = ({ slot, item }: { slot: string; item: string }) => (
  <div
    css={css`
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
    'id' | 'clothes' | 'drugs' | 'foot' | 'hand' | 'neck' | 'ring' | 'vehicle' | 'waist' | 'weapon'
  >;
}) => {
  const { library } = useWeb3React();
  const paper = Paper__factory.connect(
    process.env.NEXT_PUBLIC_PAPER_CONTRACT_ADDRESS!,
    library.getSigner(),
  );
  const stockpile = Stockpile__factory.connect(
    process.env.NEXT_PUBLIC_STOCKPILE_CONTRACT_ADDRESS!,
    library.getSigner(),
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
          <Row key={slot[0]} slot={slot[0]} item={slot[1]} />
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
