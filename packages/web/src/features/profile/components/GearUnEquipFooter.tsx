import { Button } from '@chakra-ui/react';
import { useState, useCallback, useMemo } from 'react';
import { useHustler } from 'hooks/contracts';
import { BigNumberish } from 'ethers';
import PanelFooter from 'components/PanelFooter';
import { useNetworkCheckOptimism } from 'hooks/web3';

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
  
  const isConnectedToOptimism = useNetworkCheckOptimism();

  const hustler = useHustler();
  const unEquip = useCallback(() => {
    if(!isConnectedToOptimism) {
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
  }, [hustler, type, hustlerId, isConnectedToOptimism]);

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
