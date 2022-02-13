import { css } from '@emotion/react';
import { DopeCardProps } from './DopeCard';
import { ethers } from 'ethers';
import { Image } from '@chakra-ui/react';
import Link from 'next/link';
import DopeCardTitleButton from './DopeCardTitleButton';

type DopeCardTitleCostProps = Pick<DopeCardProps, 'dope'>;

const LINK_PREFIX = 'https://opensea.io/assets/0x8707276df042e89669d69a177d3da7dc78bd8723/';

const DopeCardTitleCost = ({ dope }: DopeCardTitleCostProps) => {
  const activeListings = dope.listings?.filter(l => l?.active);
  const isOnSale = !!activeListings?.[0]?.inputs?.[0]?.amount;
  const price = activeListings?.[0]?.inputs?.[0]?.amount;

  return (
    <DopeCardTitleButton>
      <Link href={LINK_PREFIX + dope.id} passHref={true}>
        <a
          target="opensea"
          css={css`
            display: block;
          `}
        >
          {isOnSale && `${ethers.utils.formatEther(price)} Ξ`}
          {!isOnSale && (
            <Image
              src="/images/icon/open-sea.svg"
              alt="openSea"
              css={css`
                display: block;
                margin: 0;
              `}
            />
          )}
        </a>
      </Link>
    </DopeCardTitleButton>
  );
};
export default DopeCardTitleCost;
