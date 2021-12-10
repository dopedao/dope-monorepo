import { css } from '@emotion/react';
import { media } from 'styles/mixins';
import Image from 'next/image';

type IconProps = {
  icon: string;
  label: string;
  clickAction: () => void;
};

const DesktopIcon = ({ icon, label, clickAction }: IconProps) => (
  <div
    onClick={() => clickAction()}
    className="desktop-icon"
    css={css`
      display: flex;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      cursor: hand;
      // Default
      width: 96px;
      height: 96px;
      ${media.tablet`
          width: 128px;
          height: 128px;
        `}
      ${media.laptop`
          width: 128px;
          height: 128px;
        `}
    `}
  >
    <div
      className="desktop-icon-image"
      css={css`
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        // Default
        width: 48px;
        height: 48px;
        ${media.tablet`
            width: 54px;
            height: 54px;
          `}
        ${media.laptop`
            width: 64px;
            height: 64px;
          `}
          img {
          display: block;
        }
      `}
    >
      <Image src={`/images/icon/${icon}.svg`} alt={icon} width="100%" height="100%" />
    </div>
    <div
      className="desktop-icon-label"
      css={css`
        align-self: center;
        font-size: 12px;
        background-color: #000;
        color: #fff;
        text-align: center;
        padding: 4px 8px;
      `}
    >
      {label}
    </div>
  </div>
);

export default DesktopIcon;
