import { ethers } from 'ethers';
import { Button, Stack, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useInitiator, usePaper, useAddressFromContract } from 'hooks/contracts';
import { useAccount } from 'wagmi';
import ApprovePaper from 'components/panels/ApprovePaper';
import AppWindowEthereum from 'components/AppWindowEthereum';
import Dialog from 'components/Dialog';
import Head from 'components/Head';
import MintTo from 'components/panels/MintTo';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import router, { useRouter } from 'next/router';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import DopeCardBody from 'features/dope/components/DopeCardBody';
import { useDopesQuery } from 'generated/graphql';
import LoadingBlock from 'components/LoadingBlock';
import ReceiptItemDope from 'features/hustlers/components/ReceiptItemDope';
import ReceiptItemPaper from 'features/hustlers/components/ReceiptItemPaper';
import ReceiptItemGear from 'features/hustlers/components/ReceiptItemGear';
import { Box } from '@chakra-ui/react';

const Approve = () => {
  const { address: account } = useAccount();
  const { query } = useRouter();
  const dopeId = query.id as string;

  const [mintTo, setMintTo] = useState<boolean>(false);
  const [mintAddress, setMintAddress] = useState<string>('');

  const initiator = useInitiator();
  const initiatorAddress = useAddressFromContract(initiator);
  const paper = usePaper();

  // Check if DOPE already opened and prevent usage
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    if (!dopeId) return;
    let isMounted = true;
    initiator.isOpened(BigInt(dopeId)).then(value => {
      if (isMounted) setIsOpened(value);
    });
    return () => {
      isMounted = false;
    };
  }, [initiator, dopeId]);

  // Set PAPER cost based on contract amount due to "halvening"
  const [paperCost, setPaperCost] = useState<bigint>();
  useEffect(() => {
    let isMounted = true;
    initiator.cost().then(setPaperCost);
    return () => {
      isMounted = false;
    };
  }, [initiator]);

  // Do we have enough PAPER?
  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();
  useEffect(() => {
    if (account && paperCost) {
      paper.balanceOf(account).then(balance => setHasEnoughPaper(balance >= paperCost));
    }
  }, [account, paper, paperCost]);

  // Is PAPER approved?
  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();
  useEffect(() => {
    async function fetchData() {
      if (account && paperCost) {
        const initAddress = await initiator.getAddress();
        paper
          .allowance(account, initAddress)
          .then((allowance: bigint) => setIsPaperApproved(allowance >= paperCost));
      }
    }
    fetchData();
  }, [account, initiator, initiator.getAddress, paper, paperCost]);

  // Can we MINT based on above?
  const [canMint, setCanMint] = useState(false);
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

  const { data, isFetching } = useDopesQuery(
    {
      where: {
        id: dopeId,
      },
    },
    {
      enabled: !!account,
    },
  );
  const dope = data?.dopes?.edges?.[0]?.node;

  if (isOpened === true) {
    return (
      <AppWindowEthereum padBody={false} title="Claim DOPE Gear">
        <Dialog title="Sorry…" icon="dope-smiley-sad">
          <p>Gear has already been claimed from DOPE #{dopeId}. Please try another NFT.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Dialog>
      </AppWindowEthereum>
    );
  }

  return (
    <AppWindowEthereum requiresWalletConnection={true} padBody={false} title="Claim DOPE Gear">
      <Head title="Claim Gear" />

      <StackedResponsiveContainer>
        <Stack flex="2 !important">
          <PanelContainer
            css={css`
              min-height: 400px;
              background-color: #333;
              flex: 2;
            `}
          >
            <PanelTitleHeader>Gear You&apos;re Claiming</PanelTitleHeader>
            {isFetching && <LoadingBlock />}
            {!isFetching && dope && (
              <DopeCardBody dope={dope} isExpanded={true} hidePreviewButton={true} />
            )}
          </PanelContainer>
          <ApprovePaper
            address={initiatorAddress}
            isApproved={isPaperApproved}
            onApprove={approved => setIsPaperApproved(approved)}
          >
            We need you to allow our Swap Meet to spend{' '}
            <ReceiptItemPaper amount={paperCost} hideUnderline /> to Claim Gear of your DOPE NFT #
            {dopeId}.
          </ApprovePaper>
          <MintTo
            mintTo={mintTo}
            setMintTo={setMintTo}
            mintAddress={mintAddress}
            setMintAddress={setMintAddress}
          />
        </Stack>
        <PanelContainer>
          <PanelTitleHeader>Transaction Details</PanelTitleHeader>
          <PanelBody>
            <h4>You Use</h4>
            <hr className="onColor" />
            <ReceiptItemDope dopeId={dopeId} hideUnderline />
            <br />
            <h4>You Pay</h4>
            <hr className="onColor" />

            <ReceiptItemPaper amount={paperCost} hideUnderline />
            <br />
            <h4>You Receive</h4>
            <hr className="onColor" />
            <ReceiptItemGear hideUnderline />
          </PanelBody>
          <PanelFooter>
            <Box
              className="smallest"
              css={css`
                text-align: right;
                padding: 0 8px;
              `}
            >
              This only claims gear.
              <br />
              It does not mint a Hustler.
            </Box>
            <Button variant="primary" onClick={unbundleDope} isDisabled={!canMint}>
              🔓 Claim Gear 🔓
            </Button>
          </PanelFooter>
        </PanelContainer>
      </StackedResponsiveContainer>
    </AppWindowEthereum>
  );
};

export default Approve;
