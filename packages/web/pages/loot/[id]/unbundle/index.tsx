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

import { useInitiator, usePaper, useSwapMeet } from 'hooks/contracts';
import { useIsContract } from 'hooks/web3';
import router, { useRouter } from 'next/router';
import RenderLoot from 'components/loot/RenderLoot';
import LoadingBlockSquareCentered from 'components/LoadingBlockSquareCentered';
import AppWindow from 'components/AppWindow';

const Approve = () => {
  const { chainId, account } = useWeb3React();
  const { query } = useRouter();
  const dopeId = query.id as string;

  const [showAddressField, setShowAddressField] = useState<boolean>(false);
  const [mintAddress, setMintAddress] = useState<string>('');
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
    if (isPaperApproved && hasEnoughPaper && (!isContract || (isContract && mintAddress))) {
      setCanMint(true);
    }
  }, [isPaperApproved, hasEnoughPaper, isContract, account]);

  const unbundleLoot = () => {
    if (!account) {
      return;
    }

    initiator
      .open(dopeId, mintAddress || account, '0x', 600000)
      .then(() => router.replace('/loot/unbundle-success'));
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
          <ApprovePaper
            address={initiator.address}
            isApproved={isPaperApproved}
            onApprove={approved => setIsPaperApproved(approved)}
          >
            We need you to allow our Swap Meet to spend 12,500 $PAPER for the unbundling of your
            DOPE NFT #{dopeId}.
          </ApprovePaper>
          {!showAddressField && !isContract && (
            <Button variant="linkBlack" onClick={() => setShowAddressField(true)}>
              Send Hustler to a friend?
            </Button>
          )}

          {showAddressField && (
            <PanelContainer>
              <PanelTitleBar>Mint to Different Address</PanelTitleBar>
              <PanelBody>
                <p>Send this Hustler to a friend, or another wallet?</p>
                <Input
                  placeholder="0x…"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMintAddress(e.target.value)
                  }
                  value={mintAddress}
                />
              </PanelBody>
            </PanelContainer>
          )}
          {isContract && (
            <PanelContainer>
              <PanelTitleBar>Mint to Different Address</PanelTitleBar>
              <PanelBody>
                <p>
                  It looks like you are using a contract wallet. Please set the optimism address you
                  want your hustler minted to.
                </p>
                <Input
                  placeholder="0x…"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMintAddress(e.target.value)
                  }
                  value={mintAddress}
                />
              </PanelBody>
            </PanelContainer>
          )}
        </Stack>
        <PanelContainer
          css={css`
            min-height: 400px;
            background-color: #000;
          `}
        >
          <PanelTitleBar>Loot</PanelTitleBar>
          {itemIds ? (
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
          ) : (
            <LoadingBlockSquareCentered />
          )}
        </PanelContainer>
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default Approve;
