import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';

import PanelContainer from 'components/PanelContainer';

type ProfileCardProps = {
  children: ReactNode;
};

const ProfileCard: FC<ProfileCardProps> = ({ children }) => {
  return (
    <PanelContainer
      css={css`
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: stretch;
        flex-direction: column;
        gap: 0;
      `}
    >
      {children}
    </PanelContainer>
  );
};

export default ProfileCard;
