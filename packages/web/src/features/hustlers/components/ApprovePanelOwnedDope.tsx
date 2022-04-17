import { BigNumber } from 'ethers';
import { Button, Stack, Alert, AlertIcon } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { useInitiator, usePaper } from 'hooks/contracts';
import { useIsContract } from 'hooks/web3';
import { useWeb3React } from '@web3-react/core';
import { StepsProps } from 'features/hustlers/modules/Steps';
import ApprovePaper from 'components/panels/ApprovePaper';
import MintTo from 'components/panels/MintTo';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import { createConfig } from 'utils/HustlerConfig';
import ReceiptItemHustler from './ReceiptItemHustler';
import ReceiptItemDope from './ReceiptItemDope';
import ReceiptItemPaper from './ReceiptItemPaper';
import ReceiptItemGear from './ReceiptItemGear';
import DisconnectAndQuitButton from './DisconnectAndQuitButton';

const ApprovePanelOwnedDope = ({hustlerConfig, setHustlerConfig}: StepsProps) => {
  const [mintTo, setMintTo] = useState(hustlerConfig.mintAddress != null);
  const [canMint, setCanMint] = useState(false);
  const { account } = useWeb3React();
  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();
  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();
  const isContract = useIsContract(account);
  const dispatchHustler = useDispatchHustler();
  const initiator = useInitiator();


  // Set PAPER cost based on contract amount due to "halvening"
  const [paperCost, setPaperCost] = useState<BigNumber>();
  useEffect(() => {
    let isMounted = true;
    initiator.cost().then(setPaperCost);
    return () => { isMounted = false };
  }, [initiator]);

  // Has enough paper?
  const paper = usePaper();
  useEffect(() => {
    if (account && paperCost) {
      paper
        .balanceOf(account)
        .then(balance => setHasEnoughPaper(balance.gte(paperCost)));
    }
  }, [account, paper, paperCost]);


// Can we mint?
  useEffect(() => {
    if (isPaperApproved && hasEnoughPaper && (!mintTo || (mintTo && hustlerConfig.mintAddress))) {
      setCanMint(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaperApproved, hasEnoughPaper, isContract, hustlerConfig.mintAddress, hustlerConfig.body]);

  const mintHustler = () => {
    if (!account) {
      return;
    }

    const config = createConfig(hustlerConfig)

    const {
      dopeId,
      mintAddress,
    } = hustlerConfig;

    initiator
      .mintFromDopeTo(dopeId, mintAddress ? mintAddress : account, config, '0x', 1500000)
      .then(() =>
        dispatchHustler({
          type: 'GO_TO_FINALIZE_STEP',
        }),
      );
  };

  const setMintAddress = useCallback(
    (value: string) => {
      setHustlerConfig({ ...hustlerConfig, mintAddress: value });
    },
    [hustlerConfig, setHustlerConfig],
  );

  return(
    <Stack>
      {!isPaperApproved &&
        <ApprovePaper
          address={initiator.address}
          isApproved={isPaperApproved}
          onApprove={approved => setIsPaperApproved(approved)}
        >
          We need you to allow our Swap Meet to spend <ReceiptItemPaper amount={paperCost} hideUnderline /> to Claim Gear of DOPE NFT #{hustlerConfig.dopeId}.
        </ApprovePaper> 
      }
      {isPaperApproved && 
        <PanelContainer justifyContent="flex-start">
          <PanelTitleHeader>Transaction Details</PanelTitleHeader>
          <PanelBody>
            <h4>You Use</h4>
            <hr className="onColor" />
            <ReceiptItemDope dopeId={hustlerConfig.dopeId} hideUnderline />
            <br/>
            <h4>You Pay</h4>
            <hr className="onColor" />
            <ReceiptItemPaper amount={paperCost} hideUnderline />
            {!hasEnoughPaper && (
              <Alert status="error">
                <AlertIcon />
                Not enough $PAPER
              </Alert>
            )}
            <br/>
            <h4>You Receive</h4>
            <hr className="onColor" />
            <ReceiptItemHustler hustlerConfig={hustlerConfig} />
            <ReceiptItemGear hideUnderline />
          </PanelBody>
          <PanelFooter
            css={css`
              padding: 1em;
              position: relative;
            `}
          >
            <DisconnectAndQuitButton returnToPath='/inventory?section=Dope' />
            {/* <MintTo
              mintTo={mintTo}
              setMintTo={setMintTo}
              mintAddress={hustlerConfig.mintAddress}
              setMintAddress={setMintAddress}
            /> */}
            <Button variant="primary" onClick={mintHustler} disabled={!canMint} autoFocus>
              ✨ Mint Hustler ✨
            </Button>
          </PanelFooter>
        </PanelContainer>
      }
    </Stack>
  );
}
export default ApprovePanelOwnedDope;
