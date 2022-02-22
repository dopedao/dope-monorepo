import { BigNumber, utils } from 'ethers';
import { Button, Stack, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useInitiator, usePaper, useSwapMeet } from 'hooks/contracts';
import { useWeb3React } from '@web3-react/core';
import { ZOOM_WINDOWS } from 'utils/HustlerConfig';
import ApprovePaper from 'components/panels/ApprovePaper';
import AppWindowEthereum from 'components/AppWindowEthereum';
import Dialog from 'components/Dialog';
import Head from 'components/Head';
import MintTo from 'components/panels/MintTo';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import RenderFromDopeId from 'components/hustler/RenderFromDopeId';
import router, { useRouter } from 'next/router';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Approve = () => {
  const { account } = useWeb3React();
  const { query } = useRouter();
  const dopeId = query.id as string;

  const [mintTo, setMintTo] = useState<boolean>(false);
  const [mintAddress, setMintAddress] = useState<string>('');
  const [canMint, setCanMint] = useState(false);
  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();
  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();
  const [paperCost, setPaperCost] = useState<BigNumber>();

  const initiator = useInitiator();
  const paper = usePaper();

  // Check if DOPE already opened and prevent usage
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    if (!dopeId) return;
    let isMounted = true;
    initiator.isOpened(BigNumber.from(dopeId)).then(value => {
      if (isMounted) setIsOpened(value);
    });
    return () => { isMounted = false };
  }, [initiator, dopeId]);

  // Set PAPER cost based on contract amount due to "halvening"
  useEffect(() => {
    let isMounted = true;
    initiator.cost().then(setPaperCost);
    return () => { isMounted = false };
  }, [initiator]);

  useEffect(() => {
    if (account && paperCost) {
      paper
        .balanceOf(account)
        .then(balance => setHasEnoughPaper(balance.gte(paperCost)));
    }
  }, [account, paper, paperCost]);

  useEffect(() => {
    if (account && paperCost) {
      paper
        .allowance(account, initiator.address)
        .then((allowance: BigNumber) =>
          setIsPaperApproved(allowance.gte(paperCost)),
        );
    }
  }, [account, initiator.address, paper, paperCost]);

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

  if (isOpened === true) {  
    return (
      <AppWindowEthereum padBody={false} title="Claim DOPE Gear">
        <Dialog title="Sorry…" icon="dope-smiley-sad">
          <p>Gear has already been claimed from DOPE #{dopeId}. Please try another NFT.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Dialog>
      </AppWindowEthereum>
    )
  }


  return (
    <AppWindowEthereum requiresWalletConnection={true} padBody={false} title="Claim DOPE Gear">
      <Head title="Claim Gear" />

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
                    <Td textAlign="right">
                      {paperCost &&
                        parseInt(utils.formatEther(paperCost), 10).toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                      })}
                    </Td>
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
            background-color: #333;
          `}
        >
          <PanelTitleHeader>Gear You&apos;re Claiming</PanelTitleHeader>
          <RenderFromDopeId id={dopeId} isVehicle={true} zoomWindow={ZOOM_WINDOWS[2]} />
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
