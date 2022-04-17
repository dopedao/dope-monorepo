import { createContext, ReactNode, useContext, useMemo, useState } from "react"

type Game = {
  round: number
  cash: number
}

type RollYourOwn = {
  game: Game
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

  const incrementRound = () => {
    setGame((prev) => ({
      ...prev,
      round: prev.round + 1,
    }))
  }

  const value = useMemo(() => ({
    game,
    incrementRound,
  }), [game])

  return (
    <RollYourOwnContext.Provider value={value}>
      {children}
    </RollYourOwnContext.Provider>
  )
}

export default RollYourOwnProvider
