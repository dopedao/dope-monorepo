import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { ethers } from 'ethers';

import { DopeCardProps } from './DopeCard';

const viewOnOpenSea = (tokenId: string): void => {
  const baseOpenSeaUrl = 'https://opensea.io/assets/0x8707276df042e89669d69a177d3da7dc78bd8723';
  const url = `${baseOpenSeaUrl}/${tokenId}`;
  window.open(url, 'dopeWarsList')?.focus();
};

type DopeCardButtonBarMarketProps = Pick<DopeCardProps, 'dope'>;

const DopeCardButtonBarMarket = ({ dope }: DopeCardButtonBarMarketProps) => {
  const isOnSale = !!dope.listings?.[0]?.inputs?.[0]?.amount;
  return isOnSale ? (
    <Button
      onClick={() => viewOnOpenSea(dope.id)}
      css={css`
        float: right;
      `}
      variant={isOnSale ? 'primary' : 'solid'}
    >
      Mint Hustler
    </Button>
  ) : null;
};
export default DopeCardButtonBarMarket;
