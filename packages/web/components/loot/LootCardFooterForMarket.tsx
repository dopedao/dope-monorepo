import { Bag } from 'src/generated/graphql';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';

interface FooterForMarketProps {
  bag: Pick<Bag, 'id' | 'rank' | 'open_sea_asset'>;
}

const viewOnOpenSea = (tokenId: string): void => {
  const baseOpenSeaUrl = 'https://opensea.io/assets/0x8707276df042e89669d69a177d3da7dc78bd8723';
  const url = `${baseOpenSeaUrl}/${tokenId}`;
  window.open(url, 'dopeWarsList')?.focus();
};

const ContextSensitiveButton = ({ bag }: FooterForMarketProps) => {
  const isOnSale = bag.open_sea_asset?.is_on_sale;
  const price = bag.open_sea_asset?.current_sale_price;
  return (
    <Button
      onClick={() => viewOnOpenSea(bag.id)}
      css={css`
        float: right;
      `}
      variant={isOnSale ? 'primary' : 'solid'}
    >
      {isOnSale ? `Buy for ${price} Ξ` : 'View'}
    </Button>
  );
};

const LastSaleOrNever = ({ bag }: FooterForMarketProps) => {
  const lastSalePrice = bag.open_sea_asset?.last_sale_price;
  if (lastSalePrice)
    return (
      <span
        css={css`
          white-space: nowrap;
        `}
      >
        Last {lastSalePrice} Ξ
      </span>
    );
  return <></>;
};

const LootCardFooterForMarket = ({ bag }: FooterForMarketProps) => {
  return (
    <>
      <div
        css={css`
          text-align: center;
        `}
      >
        <LastSaleOrNever bag={bag} />
      </div>
      <div>
        <ContextSensitiveButton bag={bag} />
      </div>
    </>
  );
};
export default LootCardFooterForMarket;
