import { Button, Stack, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { useInitiator, usePaper } from 'hooks/contracts';
import { useIsContract } from 'hooks/web3';
import { useAccount } from 'wagmi';
import { StepsProps } from 'features/hustlers/modules/Steps';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import { createConfig } from 'utils/HustlerConfig';
import ReceiptItemHustler from './ReceiptItemHustler';
import ReceiptItemDope from './ReceiptItemDope';
import ReceiptItemGear from './ReceiptItemGear';
import DisconnectAndQuitButton from './DisconnectAndQuitButton';
import { useAddressFromContract } from 'hooks/contracts';
import useEthersSigner from 'hooks/useEthersSigner';
import { BigNumberish, JsonRpcSigner, ethers } from 'ethers';

const ApprovePanelOwnedDope = ({ hustlerConfig, setHustlerConfig }: StepsProps) => {
  const [mintTo, setMintTo] = useState(hustlerConfig.mintAddress != null);
  const [canMint, setCanMint] = useState(false);
  const [mintInProgress, setMintInProgress] = useState(false);

  const { address: account } = useAccount();
  const isContract = useIsContract(account);
  const dispatchHustler = useDispatchHustler();

  const signer = useEthersSigner();
  const initiator = useInitiator(signer.data as JsonRpcSigner | null);

  const toast = useToast();

  // Can we mint?
  useEffect(() => {
    if (!mintTo || (mintTo && hustlerConfig.mintAddress)) {
      setCanMint(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hustlerConfig.mintAddress, mintTo]);

  const mintHustler = async () => {
    if (!account) {
      return;
    }

    const config = createConfig(hustlerConfig);
    const { dopeId, mintAddress } = hustlerConfig;

    try {
      setMintInProgress(true);
      const tx = await initiator
        .mintFromDopeTo(dopeId, mintAddress ? mintAddress : account, config, '0x', 1500000)
        .then(() =>
          dispatchHustler({
            type: 'GO_TO_FINALIZE_STEP',
          }),
        );
      toast({
        title: 'Mint Success',
        description: 'Your Hustler is being minted',
        status: 'success',
        isClosable: true,
      });
      setCanMint(false);
    } catch (e: any) {
      console.error('Error minting hustler', e);
      let title = 'Error minting hustler';
      let msg = e.message;
      let status: 'warning' | 'info' | 'success' | 'error' | 'loading' = 'warning';
      if (msg.includes('missing revert data')) {
        msg = 'Gas estimation failed. Most likely not a successful transaction to begin with.';
      }
      if (msg.includes('user rejected action')) {
        title = 'Mint cancelled';
        msg = 'Transaction was rejected in wallet.';
        status = 'warning';
      }
      toast({
        title: title,
        description: msg,
        status: status,
        duration: 10_000,
        isClosable: true,
      });
    } finally {
      setMintInProgress(false);
    }
  };

  const setMintAddress = useCallback(
    (value: string) => {
      setHustlerConfig({ ...hustlerConfig, mintAddress: value });
    },
    [hustlerConfig, setHustlerConfig],
  );

  return (
    <Stack>
      <PanelContainer justifyContent="flex-start">
        <PanelTitleHeader>Transaction Details</PanelTitleHeader>
        <PanelBody>
          <h4>You Use</h4>
          <hr className="onColor" />
          <ReceiptItemDope dopeId={hustlerConfig.dopeId} hideUnderline />
          <br />
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
          <DisconnectAndQuitButton returnToPath="/inventory?section=Dope" />
          {/* <MintTo
              mintTo={mintTo}
              setMintTo={setMintTo}
              mintAddress={hustlerConfig.mintAddress}
              setMintAddress={setMintAddress}
            /> */}
          <Button
            variant="primary"
            onClick={mintHustler}
            isDisabled={!canMint}
            autoFocus
            isLoading={mintInProgress}
          >
            ✨ Mint Hustler ✨
          </Button>
        </PanelFooter>
      </PanelContainer>
    </Stack>
  );
};
export default ApprovePanelOwnedDope;
