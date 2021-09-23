import { css } from '@emotion/react';
import Image from 'next/image';

interface IconProps {
  icon: string;
  clickAction: () => void;
}

const AppWindowTitleButton = ({ icon, clickAction }: IconProps) => {
  return (
    <div
      onClick={() => clickAction()}
      css={css`
        background-color: #d0d0d0;
        box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset,
          1px 1px 0px rgba(255, 255, 255, 0.25) inset;
        display: inline-block;
        width: 32px;
        height: 32px;
        border-right: 2px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        cursor: hand;
        img {
          display: block;
        }
      `}
    >
      <Image
        src={`/images/icon/${icon}.svg`}
        alt={icon}
        width={16}
        height={16}
      />
    </div>
  );
};

export default AppWindowTitleButton;
