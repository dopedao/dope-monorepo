import { FC, ReactNode } from "react";
import { css } from "@emotion/react";

import PanelContainer from "components/PanelContainer";

type ProfileCardProps = {
  children: ReactNode
}

const ProfileCard: FC<ProfileCardProps> = ({
  children,
}) => {
  return (
    <PanelContainer
      css={css`
        width: 320px;
      `}
    >
      {children}
    </PanelContainer>
  )
}

export default ProfileCard
