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
            border-left: 1px solid #000;
            color: #fff;
            box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset, 1px 1px 0px rgba(255, 255, 255, 0.25) inset;
            border-top-right-radius: 4px;
          `}
        >
          {ethers.utils.formatEther(price)} Ξ
        </div>
      }
    </>
  );
};
export default DopeCardTitleCost;