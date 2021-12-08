import { css } from '@emotion/react';
import { Button, Input, Stack, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import Head from 'components/Head';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import ApprovePaper from 'components/panels/ApprovePaper';
import MintTo from 'components/panels/MintTo';

import { useInitiator, usePaper, useSwapMeet } from 'hooks/contracts';
import router, { useRouter } from 'next/router';
import RenderDope from 'components/dope/RenderDope';
import AppWindow from 'components/AppWindow';

const Approve = () => {
  const { account } = useWeb3React();
  const { query } = useRouter();
  const dopeId = query.id as string;

  const [mintTo, setMintTo] = useState<boolean>(false);
  const [mintAddress, setMintAddress] = useState<string>('');
  const [canMint, setCanMint] = useState(false);
  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();
  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();
  const [itemIds, setItemIds] = useState<BigNumber[]>();

  const initiator = useInitiator();
  const paper = usePaper();
  const swapmeet = useSwapMeet();

  useEffect(() => {
    if (dopeId) {
      swapmeet.itemIds(dopeId).then(ids =>
        // Excludes vehicle (2) and orders layers
        setItemIds([ids[6], ids[8], ids[5], ids[1], ids[3], ids[4], ids[7], ids[0]]),
      );
    }
  }, [swapmeet, dopeId]);

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
    <AppWindow requiresWalletConnection={true} padBody={false} title="Unbundle Dope">
      <Head title="Approve spend" />
      <StackedResponsiveContainer>
        <Stack>
          <PanelContainer>
            <PanelTitleBar>Cost of Unbundling</PanelTitleBar>
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
            We need you to allow our Swap Meet to spend 12,500 $PAPER for the unbundling of your
            DOPE NFT #{dopeId}.
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
          <PanelTitleBar>Dope</PanelTitleBar>
          <RenderDope itemIds={itemIds} />
          <PanelFooter
            css={css`
              padding: 1em;
              position: relative;
            `}
          >
            <Button variant="primary" onClick={unbundleDope} disabled={!canMint}>
              🔓 Unbundle Dope 🔓
            </Button>
          </PanelFooter>
        </PanelContainer>
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default Approve;
