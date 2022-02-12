import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Button, Stack, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import router, { useRouter } from 'next/router';
import { BigNumber } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useInitiator, usePaper, useSwapMeet } from 'hooks/contracts';
import Head from 'components/Head';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ApprovePaper from 'components/panels/ApprovePaper';
import MintTo from 'components/panels/MintTo';
import RenderFromDopeId from 'components/hustler/RenderFromDopeId';
import AppWindowEthereum from 'components/AppWindowEthereum';
import { ZOOM_WINDOWS } from 'utils/HustlerConfig';

const Approve = () => {
  const { account } = useWeb3React();
  const { query } = useRouter();
  const dopeId = query.id as string;

  const [mintTo, setMintTo] = useState<boolean>(false);
  const [mintAddress, setMintAddress] = useState<string>('');
  const [canMint, setCanMint] = useState(false);
  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();
  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();

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
    if (account) {
      paper
        .allowance(account, initiator.address)
        .then((allowance: BigNumber) =>
          setIsPaperApproved(allowance.gte('12500000000000000000000')),
        );
    }
  }, [account, initiator.address, paper]);

  useEffect(() => {
    if (isPaperApproved && hasEnoughPaper && (!mintTo || (mintTo && mintAddress))) {
      setCanMint(true);
    }
  }, [isPaperApproved, hasEnoughPaper, mintTo, mintAddress]);

  const unbundleDope = () => {
    if (!account) {
      return;
    }

    initiator
      .open(dopeId, mintAddress || account, 1000000)
      .then(() => router.replace('/dope/unbundle-success'));
  };

  return (
    <AppWindowEthereum requiresWalletConnection={true} padBody={false} title="Claim DOPE Gear">
      <Head title="Approve spend" />
      <StackedResponsiveContainer>
        <Stack>
          <PanelContainer>
            <PanelTitleHeader>Cost of Unbundling</PanelTitleHeader>
            <PanelBody>
              <Table>
                <Tbody>
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
                </Tbody>
              </Table>
            </PanelBody>
          </PanelContainer>
          <ApprovePaper
            address={initiator.address}
            isApproved={isPaperApproved}
            onApprove={approved => setIsPaperApproved(approved)}
          >
            We need you to allow our Swap Meet to spend 12,500 $PAPER to Claim Gear of your DOPE NFT
            #{dopeId}.
          </ApprovePaper>
          <MintTo
            mintTo={mintTo}
            setMintTo={setMintTo}
            mintAddress={mintAddress}
            setMintAddress={setMintAddress}
          />
        </Stack>
        <PanelContainer
          css={css`
            min-height: 400px;
            background-color: #000;
          `}
        >
          <PanelTitleHeader>Gear You&apos;re Claiming</PanelTitleHeader>
          <RenderFromDopeId id={dopeId} isVehicle={true} zoomWindow={ZOOM_WINDOWS[3]} />

          <PanelFooter>
            <div className="smallest">This only claims gear, it does not create a Hustler</div>
            <Button variant="primary" onClick={unbundleDope} disabled={!canMint}>
              🔓 Claim Gear 🔓
            </Button>
          </PanelFooter>
        </PanelContainer>
      </StackedResponsiveContainer>
    </AppWindowEthereum>
  );
};

export default Approve;
