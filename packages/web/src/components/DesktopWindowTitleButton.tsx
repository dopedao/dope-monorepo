import { css } from '@emotion/react';
import { Box, Image } from '@chakra-ui/react';

type IconProps = {
  icon?: string;
  title?: string;
  children?: React.ReactNode;
  clickAction: () => void;
};

const DesktopWindowTitleButton = ({ icon, title, clickAction, children }: IconProps) => {
  return (
    <Box
      onClick={() => clickAction()}
      title={title}
      css={css`
        background: #141011;
        box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset,
          1px 1px 0px rgba(255, 255, 255, 0.25) inset;
        width: ${icon && !children ? '32px' : 'auto'};
        padding: 0px 8px;
        height: 32px;
        border-right: 2px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
        cursor: hand;
        img {
          display: block;
        }
      `}
    >
      {icon && <Image src={`/images/icon/${icon}.svg`} alt={icon} width={16} height={16} />}
      {children}
    </Box>
  );
};

export default DesktopWindowTitleButton;
