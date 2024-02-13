import { css } from '@emotion/react';
import PanelContainer from 'components/PanelContainer';
import ProfileCardHeader from 'features/profile/components/ProfileCardHeader';
import PanelBody from 'components/PanelBody';
import { Box } from '@chakra-ui/react';

const NakedHustlerWarning = () => (
  <PanelContainer>
  <ProfileCardHeader>NAKED HUSTLER</ProfileCardHeader>
  <PanelBody
    css={css`
      background-color: var(--gray-800);
      flex: 2;
    `}
  >
    <Box
      css={css`color: #fff;`}
    >
      Hustlers with no GEAR are FREE TO MINT and should not be purchased for a premium on the aftermarket.
    </Box>
  </PanelBody>
</PanelContainer>
);

export default NakedHustlerWarning;
