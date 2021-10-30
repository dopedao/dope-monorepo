import { css } from '@emotion/react';
import AppWindow from '../../components/AppWindow';
import { Image } from '@chakra-ui/image';
import Head from '../../components/Head';
import StackedResponsiveContainer from '../../components/StackedResponsiveContainer';
import PanelContainer from '../../components/PanelContainer';
import PanelTitleBar from '../../components/PanelTitleBar';
import InitiationInfo from '../../components/hustler/InitiationInfo';
import InitiationFooter from '../../components/hustler/InitiationFooter';

const title = 'Initiate New Hustler';

export default function Initiate() {
  return (
    <AppWindow requiresWalletConnection={true} scrollable={true}>
      <Head title={title} />
      <StackedResponsiveContainer>
        <InitiationInfo />

        <PanelContainer
          css={css`
            min-height: 500px;
          `}
        >
          <PanelTitleBar>Hustler</PanelTitleBar>
          <Image src="/images/hustler/Man_24.png" objectFit="cover" />
          <InitiationFooter />
        </PanelContainer>
      </StackedResponsiveContainer>
    </AppWindow>
  );
}
