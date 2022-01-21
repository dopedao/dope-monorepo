import { css } from '@emotion/react';
import { DopeCardProps } from './DopeCard';
import { ethers } from 'ethers';
import { Image } from '@chakra-ui/react';
import Link from 'next/link';

type DopeCardTitleCostProps = Pick<DopeCardProps, 'dope'>;

const LINK_PREFIX = 'https://opensea.io/assets/0x8707276df042e89669d69a177d3da7dc78bd8723/';

const DopeCardTitleCost = ({ dope }: DopeCardTitleCostProps) => {
  const isOnSale = !!dope.listings?.[0]?.inputs?.[0]?.amount;
  const price = dope.listings?.[0]?.inputs?.[0]?.amount;
  const unit = dope.listings?.[0]?.inputs[0]?.type;

  return (
    <div
      css={css`
        width: 96px;
        height: 100%;
        padding:0;
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
        background-color: #202221;
        border-left: 1px solid #000;
        color: #fff;
        box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset, 1px 1px 0px rgba(255, 255, 255, 0.25) inset;
        border-top-right-radius: 4px;
      `}
    > 
      <Link href={ LINK_PREFIX + dope.id } passHref={true}>
        <a target="opensea"
          css={css`
            display: block;
          `}
        >
          { isOnSale && `${ethers.utils.formatEther(price)} Ξ` }
          { !isOnSale &&  
            <Image 
              src="/images/icon/open-sea.svg" 
              alt="openSea" 
              css={css`display:block;margin:0;`} 
            />
          }
        </a>
      </Link>
    </div>
  );
};
export default DopeCardTitleCost;