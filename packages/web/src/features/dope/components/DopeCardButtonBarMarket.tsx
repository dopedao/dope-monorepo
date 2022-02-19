import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { Link } from '@chakra-ui/layout';

import { DopeCardProps } from './DopeCard';
import { useRouter } from 'next/router';

type DopeCardButtonBarMarketProps = Pick<DopeCardProps, 'dope'>;

const DopeCardButtonBarMarket = ({ dope }: DopeCardButtonBarMarketProps) => {
  const isOnSale = !!dope.listings?.[0]?.inputs?.[0]?.amount;
  const router = useRouter();

  return isOnSale && !dope.opened ? (
    <div
      css={css`
        padding: 16px;
        padding-top: 0px;
        width: 100%;
      `}
    >
      <Button
        css={css`
          width: 100%;
        `}
        variant="primary"
        onClick={() => {
          router.push(
            {
              pathname: `/hustlers/${dope.id}/initiate`,
              query: {
                isPurchase: true,
              },
            },
            {
              pathname: `/hustlers/${dope.id}/initiate`,
            },
          );
        }}
      >
        Mint Hustler
      </Button>
    </div>
  ) : null;
};
export default DopeCardButtonBarMarket;
