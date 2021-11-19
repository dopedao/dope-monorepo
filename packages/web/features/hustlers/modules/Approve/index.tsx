import { css } from '@emotion/react';
import { Button, Stack, Switch, Table, Tr, Td, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BigNumber, constants } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { StepsProps } from 'features/hustlers/modules/Steps';
import { HustlerInitConfig } from 'src/HustlerConfig';
import Head from 'components/Head';
import HustlerPanel from 'components/hustler/HustlerPanel';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import { useInitiator, usePaper } from 'hooks/contracts';
import { useIsContract } from 'hooks/web3';
import Spinner from 'svg/Spinner';

const Approve = ({ hustlerConfig }: StepsProps) => {
  const [isLoading, setLoading] = useState(false);
  const { chainId, account } = useWeb3React();
  const [showMintToAddressBox, setShowMintToAddressBox] = useState(
    hustlerConfig.mintAddress != null,
  );
  const [canMint, setCanMint] = useState(false);
  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();
  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();
  const isContract = useIsContract(account);

  const dispatchHustler = useDispatchHustler();
  const initiator = useInitiator();
  const paper = usePaper();

  useEffect(() => {
    if (account) {
      paper
        .balanceOf(account)
        .then(balance => setHasEnoughPaper(balance.gt('12500000000000000000000')));
    }
  }, [account, paper]);

  useEffect(() => {
    if (account) {
      paper
        .allowance(account, initiator.address)
        .then((allowance: BigNumber) =>
          setIsPaperApproved(allowance.gte('12500000000000000000000')),
        );
    }
  }, [account, chainId, initiator.address, paper]);

  const handleOgSwitchChange = () => {
    HustlerInitConfig({ ...hustlerConfig, mintOg: !hustlerConfig.mintOg });
  };

  const mintHustler = () => {
    if (!account) {
      return;
    }

    const {
      dopeId,
      body,
      bgColor,
      facialHair,
      hair,
      name,
      renderName,
      renderTitle,
      sex,
      textColor,
      zoomWindow,
      mintAddress,
      mintOg,
    } = hustlerConfig;

    const setname = name ? name : '';
    const color = '0x' + textColor.slice(1) + 'ff';
    const background = '0x' + bgColor.slice(1) + 'ff';
    const bodyParts: [BigNumber, BigNumber, BigNumber, BigNumber] = [
      sex == 'male' ? BigNumber.from(0) : BigNumber.from(1),
      BigNumber.from(body),
      BigNumber.from(hair),
      BigNumber.from(facialHair),
    ];

    let bitoptions = 0;

    if (renderTitle) {
      bitoptions += 10;
    }

    if (renderName) {
      bitoptions += 100;
    }

    const options =
      '0x' +
      parseInt('' + bitoptions, 2)
        .toString(16)
        .padStart(4, '0');

    let bitmask = 11110110;
    if (setname.length > 0) {
      bitmask += 1;
    }

    if (zoomWindow[0].gt(0) || zoomWindow[0].gt(1) || zoomWindow[0].gt(2) || zoomWindow[0].gt(3)) {
      bitmask += 1000;
    }

    const mask =
      '0x' +
      parseInt('' + bitmask, 2)
        .toString(16)
        .padStart(4, '0');

    if (mintOg) {
      initiator
        .mintOGFromDopeTo(
          dopeId,
          mintAddress ? mintAddress : account,
          setname,
          color,
          background,
          options,
          zoomWindow,
          bodyParts,
          mask,
          '0x',
          1000000,
        )
        .then(() =>
          dispatchHustler({
            type: 'GO_TO_FINALIZE_STEP',
          }),
        );
    } else {
      initiator
        .mintFromDopeTo(
          dopeId,
          mintAddress ? mintAddress : account,
          setname,
          color,
          background,
          options,
          zoomWindow,
          bodyParts,
          mask,
          '0x',
          1000000,
        )
        .then(() =>
          dispatchHustler({
            type: 'GO_TO_FINALIZE_STEP',
          }),
        );
    }
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
                We need you to allow our Swap Meet to spend 12,500 $PAPER for the unbundling of your
                DOPE NFT #{hustlerConfig.dopeId}.
              </p>
              <Button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const txn = await paper.approve(initiator.address, constants.MaxUint256);
                    await txn.wait(1);
                  } catch (error) {
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={isLoading}
                width="220px"
              >
                {isLoading ? <Spinner /> : 'Approve $PAPER Spend'}
              </Button>
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
              <Button variant="primary" onClick={mintHustler}>
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
