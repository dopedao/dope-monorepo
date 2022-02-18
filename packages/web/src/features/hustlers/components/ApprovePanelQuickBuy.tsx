import { Button, Stack, Table, Tr, Td, Alert, AlertIcon } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { StepsProps } from 'features/hustlers/modules/Steps';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';

const ApprovePanelQuickBuy = ({hustlerConfig, setHustlerConfig}: StepsProps) => {
  const canMint = false;
  const mintHustler = () => {
    // tarrence to fill this in …maybe stuff from ApprovePanelOwnedDope
  };

  return(
    <PanelContainer justifyContent="flex-start">
      <PanelTitleHeader>Quick Buy Hustler</PanelTitleHeader>
      <PanelBody>
        <Table>
          <Tr>
            <Td></Td>
            <Td textAlign="right">1</Td>
            <Td>DOPE NFT #{hustlerConfig.dopeId}</Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td textAlign="right">12,500</Td>
            <Td>$PAPER</Td>
          </Tr>
        </Table>
      </PanelBody>
      <PanelFooter
        css={css`
          padding: 1em;
          position: relative;
        `}
      >
        <div></div>
        <Button variant="primary" onClick={mintHustler} disabled={!canMint}>
          ✨ Mint Hustler ✨
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
}

export default ApprovePanelQuickBuy;