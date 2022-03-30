import { useStarknet, useStarknetCall } from "@starknet-react/core"
import { useUserOwnedContract } from "hooks/contracts/roll-your-own"
import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { BigNumberish, toBN } from "starknet/dist/utils/number"
import BN from "bn.js";

type Game = {
  round: number
  cash: number
}

type RollYourOwn = {
  game: Game
  money?: BN
  ownedItems: BN[]
  incrementRound: () => void
}

const RollYourOwnContext = createContext<RollYourOwn | undefined>(undefined)

export const useRollYourOwn = () => {
  const rollYourOwn = useContext(RollYourOwnContext)

  if (!rollYourOwn) {
    throw new Error("RollYourOwnContext must be used within RollYourOwnProvider")
  }

  return rollYourOwn
}

const RollYourOwnProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [game, setGame] = useState<Game>({
    round: 0,
    cash: 0,
  })

  const { account } = useStarknet()
  const { contract } = useUserOwnedContract()
  const { data } = useStarknetCall({
    contract,
    method: "check_user_state",
    args: [account],
  })

  const { money, ownedItems } = useMemo(() => {
    if (!data) {
      return {
        // money: toBN(0),
        ownedItems: [],
      }
    }

    const [items]: BigNumberish[][] = data
    const [money, ...ownedItems] = items

    return {
      money: toBN(money),
      ownedItems: ownedItems.map(toBN),
    }
  }, [data])

  const incrementRound = () => {
    setGame((prev) => ({
      ...prev,
      round: prev.round + 1,
    }))
  }

  const value = useMemo(() => ({
    game,
    money,
    ownedItems,
    incrementRound,
  }), [game, money, ownedItems])

  return (
    <RollYourOwnContext.Provider value={value}>
      {children}
    </RollYourOwnContext.Provider>
  )
}

export default RollYourOwnProvider
