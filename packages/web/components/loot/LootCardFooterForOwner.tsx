import { Bag } from '../../src/generated/graphql';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { NETWORK } from '../../src/constants';
import { Paper__factory, Stockpile__factory } from '@dopewars/contracts';
import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

interface Props {
  bag: Pick<Bag, 'id' | 'claimed'>;
  toggleVisibility(): void;
}

const LootCardFooterForOwner = ({ bag, toggleVisibility }: Props) => {
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
    <>
      <div>
        <Button
          disabled={bag.claimed}
          onClick={async () => {
            await paper.claimById(bag.id);
          }}
        >
          Claim Paper
        </Button>
        <Button
          disabled={chainId == 1}
          onClick={async () => {
            await stockpile.open(bag.id);
          }}
        >
          Unbundle
        </Button>
      </div>
      <div
        css={css`
          text-align: right;
          cursor: pointer;
        `}
        onClick={() => toggleVisibility()}
      >
        <img
          src="/images/icon/info.svg"
          width="24"
          height="24"
          css={css`
            display: inline-block;
            margin-left: 8px;
          `}
        />
      </div>
    </>
  );
};
export default LootCardFooterForOwner;
