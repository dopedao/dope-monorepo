import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { DopeCardProps } from './DopeCard';

const viewOnOpenSea = (tokenId: string): void => {
  const baseOpenSeaUrl = 'https://opensea.io/assets/0x8707276df042e89669d69a177d3da7dc78bd8723';
  const url = `${baseOpenSeaUrl}/${tokenId}`;
  window.open(url, 'dopeWarsList')?.focus();
};

const ContextSensitiveButton = ({ dope }: DopeCardFooterForMarketProps) => {
  const isOnSale = !!dope.listings?.[0]?.outputs?.[0]?.amount;
  const price = dope.listings?.[0]?.outputs?.[0]?.amount;
  const unit = dope.listings?.[0]?.outputs[0]?.type;
  return (
    <Button
      onClick={() => viewOnOpenSea(dope.id)}
      css={css`
        float: right;
      `}
      variant={isOnSale ? 'primary' : 'solid'}
    >
      {isOnSale ? `Buy for ${price} ${unit}` : 'View'}
    </Button>
  );
};

const LastSaleOrNever = ({ dope }: DopeCardFooterForMarketProps) => {
  const lastSalePrice = dope.listings?.[0]?.outputs?.[0]?.amount;
  const unit = dope.listings?.[0]?.outputs[0]?.type;
  if (lastSalePrice)
    return (
      <span
        css={css`
          white-space: nowrap;
        `}
      >
        Last {lastSalePrice} {unit}
      </span>
    );
  return <></>;
};

type DopeCardFooterForMarketProps = Pick<DopeCardProps, 'dope'>;

const DopeCardFooterForMarket = ({ dope }: DopeCardFooterForMarketProps) => {
  return (
    <>
      <div
        css={css`
          text-align: center;
        `}
      >
        <LastSaleOrNever dope={dope} />
      </div>
      <div>
        <ContextSensitiveButton dope={dope} />
      </div>
    </>
  );
};
export default DopeCardFooterForMarket;
