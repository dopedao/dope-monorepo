import { Button } from '@chakra-ui/react';
import { useOptimism } from 'hooks/web3';
import { useCallback } from 'react';
import { useHustler } from 'hooks/contracts';
import { useWeb3React } from '@web3-react/core';
import { BigNumberish } from 'ethers';
import PanelFooter from 'components/PanelFooter';

const GearUnEquipFooter = ({ id, hustlerId }: { id: string; hustlerId: BigNumberish }) => {
  const { account } = useWeb3React();
  const { chainId } = useOptimism();

  const hustler = useHustler();
  const unEquip = useCallback(() => {
    hustler.unequip(hustlerId, [
      // need proper slot id here…not sure how to get it
    ]);
  }, [hustler, hustlerId]);

  return (
    <PanelFooter>
      <div></div>
      <Button variant="primary" onClick={unEquip}>
        Remove
      </Button>
    </PanelFooter>
  );
};

export default GearUnEquipFooter;
