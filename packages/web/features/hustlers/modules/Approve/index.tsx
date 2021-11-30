import { css } from '@emotion/react';
import { Button, Stack, Table, Tr, Td } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { SetMetadataStruct } from '@dopewars/contracts/dist/Initiator';

import ApprovePaper from 'components/panels/ApprovePaper';
import MintTo from 'components/panels/MintTo';
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

const Approve = ({ hustlerConfig }: StepsProps) => {
  const { account } = useWeb3React();
  const [mintTo, setMintTo] = useState(hustlerConfig.mintAddress != null);
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
        .then(balance => setHasEnoughPaper(balance.gte('12500000000000000000000')));
    }
  }, [account, paper]);

  useEffect(() => {
    if (isPaperApproved && hasEnoughPaper && (!mintTo || (mintTo && hustlerConfig.mintAddress))) {
      setCanMint(true);
    }
  }, [isPaperApproved, hasEnoughPaper, isContract, hustlerConfig.mintAddress, hustlerConfig.body]);

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
      sex,
      textColor,
      zoomWindow,
      mintAddress,
    } = hustlerConfig;

    const setname = name ? name : '';
    const color = '0x' + textColor.slice(1) + 'ff';
    const background = '0x' + bgColor.slice(1) + 'ff';
    const bodyParts: [BigNumber, BigNumber, BigNumber, BigNumber] = [
      sex == 'male' ? BigNumber.from(0) : BigNumber.from(1),
      BigNumber.from(body),
      BigNumber.from(hair),
      sex == 'male' ? BigNumber.from(facialHair) : BigNumber.from(0),
    ];

    let bitoptions = 0;

    if (renderName) {
      // title
      bitoptions += 10;
      // name
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

    const metadata: SetMetadataStruct = {
      name: setname,
      color,
      background,
      options,
      viewbox: zoomWindow,
      body: bodyParts,
      order: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      mask,
    };

    initiator
      .mintFromDopeTo(dopeId, mintAddress ? mintAddress : account, metadata, '0x', 1500000)
      .then(() =>
        dispatchHustler({
          type: 'GO_TO_FINALIZE_STEP',
        }),
      );
  };

  const setMintAddress = useCallback(
    (value: string) => {
      HustlerInitConfig({ ...hustlerConfig, mintAddress: value });
    },
    [hustlerConfig],
  );

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
              </Table>
            </PanelBody>
          </PanelContainer>
          <ApprovePaper
            address={initiator.address}
            isApproved={isPaperApproved}
            onApprove={approved => setIsPaperApproved(approved)}
          >
            We need you to allow our Swap Meet to spend 12,500 $PAPER for the unbundling of your
            DOPE NFT #{hustlerConfig.dopeId}.
          </ApprovePaper>
          <MintTo
            mintTo={mintTo}
            setMintTo={setMintTo}
            mintAddress={hustlerConfig.mintAddress}
            setMintAddress={setMintAddress}
          />
        </Stack>
        <HustlerPanel
          hustlerConfig={hustlerConfig}
          footer={
            <PanelFooter
              css={css`
                padding: 1em;
                position: relative;
              `}
            >
              <Button variant="primary" onClick={mintHustler} disabled={!canMint}>
                ✨ Initiate Hustler ✨
              </Button>
            </PanelFooter>
          }
        />
      </StackedResponsiveContainer>
    </>
  );
};

export default Approve;
