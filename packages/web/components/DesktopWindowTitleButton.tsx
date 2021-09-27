import { css } from '@emotion/react';
import Image from 'next/image';

interface IconProps {
  icon: string;
  title?: string;
  clickAction: () => void;
}

const DesktopWindowTitleButton = ({ icon, title, clickAction }: IconProps) => {
  return (
    <div
      onClick={() => clickAction()}
      title={title}
      css={css`
        background: #141011;
        box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset,
          1px 1px 0px rgba(255, 255, 255, 0.25) inset;
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
      <Image src={`/images/icon/${icon}.svg`} alt={icon} width={16} height={16} />
    </div>
  );
};

export default DesktopWindowTitleButton;
