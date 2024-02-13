import { Button } from '@chakra-ui/react';
import { useState, useCallback, useMemo } from 'react';
import PanelFooter from 'components/PanelFooter';
import { Box } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import StatusText from 'components/StatusText';

// web3 stuff
import { useAccount } from 'wagmi';
import { useHustler } from 'hooks/contracts';
import useEthersSigner from 'hooks/useEthersSigner';
import { BigNumberish, JsonRpcSigner, ethers } from 'ethers';
import { useContextualChainId } from 'hooks/web3';

const SLOTS = [
  'WEAPON',
  'CLOTHES',
  'VEHICLE',
  'WAIST',
  'FOOT',
  'HAND',
  'DRUGS',
  'NECK',
  'RING',
  'ACCESSORY',
];

const GearUnEquipFooter = ({
  id,
  hustlerId,
  type,
}: {
  id: string;
  type: string;
  hustlerId: BigNumberish;
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const chainId = useContextualChainId();
  const { address: account } = useAccount();

  const onProperNetwork = useMemo(() => {
    return !(account && chainId !== 10 && chainId !== 69);
  }, [account, chainId]);

  const signer = useEthersSigner();
  const hustler = useHustler(signer.data as JsonRpcSigner | null);

  const unEquip = useCallback(() => {
    if (!onProperNetwork) {
      alert('Please switch your network to Optimism to Remove Gear');
      return;
    }
    async function unEquip() {
      setIsLoading(true);
      try {
        const tx = await hustler.unequip(hustlerId, [SLOTS.findIndex(key => key === type)]);
        txSuccess();
      } catch (e: any) {
        let msg = e.message;
        if (msg.includes('network changed')) {
          txSuccess();
          return; // not an error
        }

        setIsRemoved(false);

        console.error('Failed to remove', e);
        let title = 'Failed to remove';
        let status: 'warning' | 'info' | 'success' | 'error' | 'loading' = 'warning';
        if (msg.includes('missing revert data')) {
          msg = 'Gas estimation failed. Most likely not a successful transaction to begin with.';
          setIsRemoved(true);
        }
        if (msg.includes('user rejected action')) {
          title = 'Removal cancelled';
          msg = 'Transaction was rejected.';
          status = 'warning';
        }
        toast({
          title: title,
          description: msg,
          status: status,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
    unEquip();
  }, [onProperNetwork, hustler, hustlerId, toast, type]);

  const txSuccess = () => {
    setIsRemoved(true);
    toast({
      title: 'Gear removed',
      description: 'Waiting for confirmations to update your Hustler. This can take a few minutes.',
    });
  };

  if (isRemoved) {
    return (
      <PanelFooter>
        <StatusText>Gear removal in progress…</StatusText>
      </PanelFooter>
    );
  }

  return (
    <PanelFooter>
      <Box />
      <Button onClick={unEquip} isLoading={isLoading}>
        Remove
      </Button>
    </PanelFooter>
  );
};

export default GearUnEquipFooter;
