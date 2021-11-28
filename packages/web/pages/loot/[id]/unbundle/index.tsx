import { css } from '@emotion/react';
import { Alert, AlertIcon, Button, Stack, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BigNumber, constants } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import Head from 'components/Head';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

import { useInitiator, usePaper, useSwapMeet } from 'hooks/contracts';
import { useIsContract } from 'hooks/web3';
import Spinner from 'svg/Spinner';
import { useRouter } from 'next/router';
import RenderLoot from 'components/loot/RenderLoot';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import AppWindow from 'components/AppWindow';

const Approve = () => {
  const [warning, setWarning] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { chainId, account } = useWeb3React();
  const {query} = useRouter();
  const dopeId = query.id as string;

  const [canMint, setCanMint] = useState(false);
  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();
  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();
  const [itemIds, setItemIds] = useState<BigNumber[]>();

  const isContract = useIsContract(account);
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
  }, [account, chainId, initiator.address, paper]);

  useEffect(() => {

    if (
      isPaperApproved &&
      hasEnoughPaper &&
      (!isContract || (isContract && account))
    ) {
        setCanMint(true);
        setWarning(null);
    }
  }, [
    isPaperApproved,
    hasEnoughPaper,
    isContract,
    account
  ]);

const unbundleLoot = () => {
    if (!account) {
      return;
    }

    console.log('unbundling')

    initiator
      .open(dopeId, account, '0x', 1500000)
      .then(() =>
        console.log('Go to party')
    );
  };

  return (
    <AppWindow requiresWalletConnection={true} padBody={false} title="Unbundle Loot">
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
          {isPaperApproved && (
            <Alert status="success">
              <AlertIcon />
              $PAPER Spend Approved
            </Alert>
          )}
          {!isPaperApproved && (
            <PanelContainer>
              <PanelTitleBar>Approve $PAPER Spend</PanelTitleBar>
              <PanelBody>
                <p>
                  We need you to allow our Swap Meet to spend 12,500 $PAPER for the unbundling of
                  your DOPE NFT #{dopeId}.
                </p>
                <Button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const txn = await paper.approve(initiator.address, constants.MaxUint256);
                      await txn.wait(1);
                      setIsPaperApproved(true);
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
          )}
          {warning && (
            <Alert status="warning">
              <AlertIcon />
              {warning}
            </Alert>
          )}
        </Stack>
        <PanelContainer
          css={css`
            min-height: 400px;
            background-color: #000;
          `}
        >
          <PanelTitleBar>Loot</PanelTitleBar>
          {itemIds ? 
            <>
              <RenderLoot itemIds={itemIds} />
              <PanelFooter
              css={css`
              padding: 1em;
              position: relative;
              `}
              >
                <Button variant="primary" onClick={unbundleLoot} disabled={!canMint}>
                  🔓 Unbundle Loot 🔓
                </Button>
              </PanelFooter>
            </>
            : <LoadingBlockSquareCentered />
      }
        </PanelContainer>
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default Approve;
