import { css } from '@emotion/react';
import { ethers } from 'ethers';

import { DopeCardProps } from './DopeCard';


type DopeCardTitleCostProps = Pick<DopeCardProps, 'dope'>;

const DopeCardTitleCost = ({ dope }: DopeCardTitleCostProps) => {
  const isOnSale = !!dope.listings?.[0]?.inputs?.[0]?.amount;
  const price = dope.listings?.[0]?.inputs?.[0]?.amount;
  const unit = dope.listings?.[0]?.inputs[0]?.type;

  return (
    <>
      { isOnSale &&
        <div
          css={css`
            text-align: center;
            background-color: #202221;
            width: 100px;
            color: #fff;
          `}
        >
          {ethers.utils.formatEther(price)} Ξ
        </div>
      }
    </>
  );
};
export default DopeCardTitleCost;