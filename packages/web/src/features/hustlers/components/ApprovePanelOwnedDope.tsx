import { BigNumber } from 'ethers';
import { Button, Stack, Table, Tr, Td, Alert, AlertIcon } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { SetMetadataStruct } from '@dopewars/contracts/dist/Initiator';
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

const ApprovePanelOwnedDope = ({hustlerConfig, setHustlerConfig}: StepsProps) => {
  const [mintTo, setMintTo] = useState(hustlerConfig.mintAddress != null);
  const [canMint, setCanMint] = useState(false);
  const { account } = useWeb3React();
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
          We need you to allow our Swap Meet to spend 12,500 $PAPER to Claim Gear of DOPE NFT #{hustlerConfig.dopeId}.
        </ApprovePaper> 
      }
      {isPaperApproved && 
        <PanelContainer justifyContent="flex-start">
          <PanelTitleHeader>Cost of Initiation</PanelTitleHeader>
          <PanelBody>
            {!hasEnoughPaper && (
              <Alert status="error">
                <AlertIcon />
                Not enough $PAPER
              </Alert>
            )}
            <Table>
              <Tr>
                <Td></Td>
                <Td textAlign="right">1</Td>
                <Td>DOPE NFT #{hustlerConfig.dopeId}</Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td textAlign="right">12,500</Td>
                <Td>$PAPER</Td>
              </Tr>
            </Table>
          </PanelBody>
          <PanelFooter
            css={css`
              padding: 1em;
              position: relative;
            `}
          >
            <MintTo
              mintTo={mintTo}
              setMintTo={setMintTo}
              mintAddress={hustlerConfig.mintAddress}
              setMintAddress={setMintAddress}
            />
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
