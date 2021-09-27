import { Bag } from '../../src/generated/graphql';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { getRarityForDopeId } from '../../common/dope-rarity-check';
import styled from '@emotion/styled';

interface Props {
  bag: Pick<Bag, 'id' | 'claimed'>;
}

const StatsContainer = styled.div``;

const viewOnOpenSea = (tokenId: string): void => {
  const baseOpenSeaUrl = 'https://opensea.io/assets/0x8707276df042e89669d69a177d3da7dc78bd8723';
  const url = `${baseOpenSeaUrl}/${tokenId}`;
  window.open(url, 'dopeWarsList')?.focus();
};

const LootCardFooterForMarket = ({ bag }: Props) => {
  return (
    <>
      {/* <div css={css`text-align:center;`}>Last X.X ETH</div> */}
      <div
        css={css`
          text-align: center;
        `}
      >
        {getRarityForDopeId(bag.id)}/8000
      </div>
      <div>
        <Button
          onClick={() => viewOnOpenSea(bag.id)}
          css={css`
            float: right;
          `}
        >
          View on OpenSea
        </Button>
      </div>
    </>
  );
};
export default LootCardFooterForMarket;
