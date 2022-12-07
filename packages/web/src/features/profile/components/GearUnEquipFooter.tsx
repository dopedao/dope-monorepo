import { Button } from '@chakra-ui/react';
import { useState, useCallback, useMemo } from 'react';
import { useHustler } from 'hooks/contracts';
import { useWeb3React } from '@web3-react/core';
import { BigNumberish } from 'ethers';
import PanelFooter from 'components/PanelFooter';

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
  'ACCESSORY'
];

const GearUnEquipFooter = (
  { id, hustlerId, type }: 
  { id: string; type: string; hustlerId: BigNumberish }
) => {
  const [isLoading, setIsLoading] = useState(false);
  const { account, chainId } = useWeb3React();

  const onProperNetwork = useMemo(() => {
    return !(account && chainId !== 10 && chainId !== 69);
  }, [account, chainId]);

  const hustler = useHustler();
  const unEquip = useCallback(() => {
    if(!onProperNetwork) {
      alert("Please switch your network to Optimism to Remove Gear");
      return;
    }
    setIsLoading(true);
    hustler
      .unequip(hustlerId, [SLOTS.findIndex(key => key === type)])
      .catch(e => {
        console.log('caught error')
        alert(
        "This Gear has already been removed\nOur indexer might not have caught it yet."
        );
      })
      .finally(() => setIsLoading(false)
    );
  }, [onProperNetwork, hustler, hustlerId, type]);

  return (
    <PanelFooter>
      <div></div>
      <Button 
        variant="primary" 
        onClick={unEquip}
        isLoading={isLoading}
        loadingText="Processing..."
      >
        Remove
      </Button>
    </PanelFooter>
  );
};

export default GearUnEquipFooter;
