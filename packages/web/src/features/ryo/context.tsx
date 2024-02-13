import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core';
import { useDopeWarsContract, useUserOwnedContract } from 'hooks/contracts/roll-your-own';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { BigNumberish, toBN } from 'starknet/dist/utils/number';
import BN from 'bn.js';

export enum BuyOrSell {
  Buy,
  Sell,
}

type Turn = {
  locationId?: number;
  buyOrSell?: BuyOrSell;
  itemId?: number;
  amountToGive?: number;
};

type RollYourOwn = {
  money?: BN;
  ownedItems: BN[];
  turn: Turn;

  haveTurn: () => void;
  updateTurn: (turn: Turn) => void;
};

const RollYourOwnContext = createContext<RollYourOwn | undefined>(undefined);

export const useRollYourOwn = () => {
  const rollYourOwn = useContext(RollYourOwnContext);

  if (!rollYourOwn) {
    throw new Error('RollYourOwnContext must be used within RollYourOwnProvider');
  }

  return rollYourOwn;
};

const RollYourOwnProvider = ({ children }: { children: ReactNode }) => {
  const [turn, setTurn] = useState<Turn>({});

  const { account } = useStarknet();
  const { contract: userOwnedContract } = useUserOwnedContract();
  const { contract: dopeWarsContract } = useDopeWarsContract();

  const { data: userStateData } = useStarknetCall({
    contract: userOwnedContract,
    method: 'check_user_state',
    args: [account],
  });

  const { data, error, invoke } = useStarknetInvoke({
    contract: dopeWarsContract,
    method: 'have_turn',
  });
  // console.log('data', data, error);

  const { money, ownedItems } = useMemo(() => {
    if (!userStateData) {
      return {
        ownedItems: [],
      };
    }

    const [items]: BigNumberish[][] = userStateData;
    const [money, ...ownedItems] = items;

    return {
      money: toBN(money),
      ownedItems: ownedItems.map(toBN),
    };
  }, [userStateData]);

  const updateTurn = useCallback((turn: Turn) => {
    setTurn(prev => ({
      ...prev,
      ...turn,
    }));
  }, []);

  const haveTurn = useCallback(() => {
    const { locationId, buyOrSell, itemId, amountToGive } = turn;

    invoke({
      args: [account, locationId, buyOrSell, itemId, amountToGive],
    });
  }, [account, invoke, turn]);

  const value = useMemo(
    () => ({
      money,
      ownedItems,
      turn,
      haveTurn,
      updateTurn,
    }),
    [money, ownedItems, haveTurn, turn, updateTurn],
  );

  return <RollYourOwnContext.Provider value={value as any}>{children}</RollYourOwnContext.Provider>;
};

export default RollYourOwnProvider;
