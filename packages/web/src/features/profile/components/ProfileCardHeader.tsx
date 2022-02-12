import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';

import PanelTitleBarFlex from 'components/PanelTitleBarFlex';

type ProfileCardHeaderProps = {
  children: ReactNode;
};

const ProfileCardHeader: FC<ProfileCardHeaderProps> = ({ children }) => {
  return (
    <PanelTitleBarFlex
      css={css`
        height: 40px;
        box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.15);
      `}
    >
      {children}
    </PanelTitleBarFlex>
  );
};

export default ProfileCardHeader;
