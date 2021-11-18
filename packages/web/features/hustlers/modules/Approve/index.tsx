import { css } from '@emotion/react';
import { Button, Stack, Switch, Table, Thead, Tbody, Tr, Td, Th, Input } from '@chakra-ui/react';
import { StepsProps } from 'features/hustlers/modules/Steps';
import { useState } from 'react';
import { HustlerInitConfig } from 'src/HustlerConfig';
import Head from 'components/Head';
import HustlerPanel from 'components/hustler/HustlerPanel';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';

const Approve = ({ hustlerConfig }: StepsProps) => {
  const [showMintToAddressBox, setShowMintToAddressBox] = useState(hustlerConfig.mintAddress != null);
  const [canMint, setCanMint] = useState(false);
  const dispatchHustler = useDispatchHustler();

  const handleOgSwitchChange = () => {
    HustlerInitConfig({ ...hustlerConfig, mintOg: !hustlerConfig.mintOg });
  };

  const goToNextStep = () => {
    dispatchHustler({
      type: 'GO_TO_FINALIZE_STEP',
    });
  };

  const handleMintAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    HustlerInitConfig({ ...hustlerConfig, mintAddress: e.target.value });
  };

  return (
    <>
      <Head title="Approve spend" />
      <StackedResponsiveContainer>
        <Stack>
          <PanelContainer>
            <PanelTitleBar>Cost of Initiation</PanelTitleBar>
            <PanelBody>
              <Table>
                <Tr>
                  <Td></Td>
                  <Td textAlign="right">1</Td>
                  <Td>DOPE NFT</Td>
                </Tr>
                <Tr>
                  <Td></Td>
                  <Td textAlign="right">12,500</Td>
                  <Td>$PAPER</Td>
                </Tr>
                {hustlerConfig.mintOg && (
                  <Tr>
                    <Td></Td>
                    <Td textAlign="right">0.25</Td>
                    <Td>ETH</Td>
                  </Tr>
                )}
                <Tr>
                  <Td></Td>
                  <Td textAlign="right">( gas )</Td>
                  <Td>ETH</Td>
                </Tr>
              </Table>
            </PanelBody>
          </PanelContainer>
          <PanelContainer>
            <PanelTitleBar>Approve $PAPER Spend</PanelTitleBar>
            <PanelBody>
              <p>
                We need you to allow our Swap Meet to spend 12,500 $PAPER for Tde unbundling of your
                DOPE NFT #{hustlerConfig.dopeId}.
              </p>
              <Button>Approve $PAPER Spend</Button>
            </PanelBody>
          </PanelContainer>
          {!showMintToAddressBox && (
            <Button variant="linkBlack" onClick={() => setShowMintToAddressBox(true)}>
              Send Hustler to a friend?
            </Button>
          )}
          {showMintToAddressBox && (
            <PanelContainer>
              <PanelTitleBar>Mint to Different Address</PanelTitleBar>
              <PanelBody>
                <p>Send this Hustler to a friend, or another wallet?</p>
                <Input
                  placeholder="0x…"
                  onChange={handleMintAddressChange}
                  value={hustlerConfig.mintAddress}
                />
              </PanelBody>
            </PanelContainer>
          )}
        </Stack>
        <HustlerPanel
          hustlerConfig={hustlerConfig}
          footer={
            <PanelFooter
              css={css`
                padding: 1em;
              `}
            >
              <div>
                <Switch
                  id="initiate-og-switch"
                  isChecked={hustlerConfig.mintOg}
                  onChange={handleOgSwitchChange}
                />
                <label
                  htmlFor="initiate-og-switch"
                  css={css`
                    margin-left: 0.5em;
                  `}
                >
                  Claim OG ###
                </label>
              </div>
              {/* TODO ADD BELOW disabled={!canMint} */}
              <Button variant="primary" onClick={goToNextStep}>
                {hustlerConfig.mintOg ? '👑 Initiate OG 👑' : '✨ Initiate Hustler ✨'}
              </Button>
            </PanelFooter>
          }
        />
      </StackedResponsiveContainer>
    </>
  );
};

export default Approve;
