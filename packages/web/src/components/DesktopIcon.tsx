import { Image } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';

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
      width: 128px;
      height: 128px;
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
        width: 64px;
        height: 64px;
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
