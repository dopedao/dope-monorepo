import { HStack, Button, Select, Box, Spinner } from '@chakra-ui/react';
import { NETWORK, OPT_CHAIN_ID } from 'utils/constants';
import { useHustlersWalletQuery } from 'generated/graphql';
import { useState, useEffect, useCallback } from 'react';
import { useSwapMeet } from 'hooks/contracts';
import { useAccount } from 'wagmi';
import PanelFooter from 'components/PanelFooter';
import { JsonRpcSigner, ethers } from 'ethers';
import { useIsOnOptimism } from 'hooks/web3';
import useEthersSigner from 'hooks/useEthersSigner';
import { useToast } from '@chakra-ui/react';
import StatusText from 'components/StatusText';

const GearEquipFooter = ({ id }: { id: string }) => {
  const toast = useToast();
  const { address: account } = useAccount();
  const [selected, setSelected] = useState<string>();
  const [isEquipped, setIsEquipped] = useState(false);
  const { data, isFetching: loading } = useHustlersWalletQuery(
    {
      where: {
        or: [{ id: account?.toLowerCase() }, { id: account }],
      },
    },
    {
      enabled: !!account,
    },
  );
  const [isBeingEquipped, setIsBeingEquipped] = useState(false);

  const signer = useEthersSigner();
  const swapmeet = useSwapMeet(signer.data as JsonRpcSigner | null);

  const isConnectedToOptimism = useIsOnOptimism();
  const walletsNode = data?.wallets.edges?.[0]?.node;
  const firstHustlerId = walletsNode?.hustlers?.[0]?.id;
  useEffect(() => {
    if (firstHustlerId) {
      setSelected(firstHustlerId);
    }
  }, [firstHustlerId]);

  const opChainId = parseInt(OPT_CHAIN_ID);
  //@ts-ignore
  const hustlerContractAddress = NETWORK[opChainId].contracts.hustlers;
  const equip = useCallback(() => {
    if (!isConnectedToOptimism) {
      alert('Please switch your network to Optimism to Equip Gear');
      return;
    }
    async function equipGear() {
      const sig = '0xbe3d1e89';
      const abi = new ethers.AbiCoder();
      if (!account || !swapmeet) return;

      setIsBeingEquipped(true);

      try {
        const tx = await swapmeet.safeTransferFrom(
          account,
          hustlerContractAddress,
          id,
          1,
          abi.encode(['bytes4', 'uint256'], [sig, selected]),
        );
        txSuccess();
      } catch (e: any) {
        let msg = e.message;
        if (msg.includes('network changed')) {
          txSuccess();
          return; // not an error
        }

        setIsEquipped(false);
        console.error('Equip failure', e);
        let title = 'Error equipping item';
        let status: 'warning' | 'info' | 'success' | 'error' | 'loading' = 'warning';
        if (msg.includes('missing revert data')) {
          msg = 'Gas estimation failed. Most likely not a successful transaction to begin with.';
        }
        if (msg.includes('user rejected action')) {
          title = 'Equip cancelled';
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
        setIsBeingEquipped(false);
      }
    }
    equipGear();
  }, [isConnectedToOptimism, account, swapmeet, hustlerContractAddress, id, selected, toast]);

  const txSuccess = () => {
    setIsEquipped(true);
    toast({
      title: 'Gear equipped',
      description: 'Waiting for confirmations to update your Hustler',
    });
  };

  if (isEquipped) {
    return (
      <PanelFooter>
        <StatusText>Equip in progress…</StatusText>
      </PanelFooter>
    );
  }

  return (
    <PanelFooter>
      <Select size="sm" onChange={({ target }) => setSelected(target.value)} value={selected}>
        <option disabled>Equip to…</option>
        {walletsNode?.hustlers
          ?.sort((a, b) => parseInt(a.id) - parseInt(b.id))
          .map(({ id, title, name }) => (
            <option key={id} value={id}>
              {parseInt(id) > 500 ? '' : 'OG'}#{id} - {title}{' '}
              {(name?.trim().length ?? 0) > 0 ? `${name}` : 'No Name'}
            </option>
          ))}
      </Select>
      <Button variant="primary" isLoading={isBeingEquipped} isDisabled={!selected} onClick={equip}>
        Equip
      </Button>
    </PanelFooter>
  );
};

export default GearEquipFooter;
