import AppWindow from "components/AppWindow";
import { ReactNode } from "react";
import { useStarknet } from '@starknet-react/core';

const GameWindow = ({
  children,
}: {
  children: ReactNode
}) => {
  const { account } = useStarknet();
  console.log(account);

  return (
    <AppWindow
      scrollable
      background='#202221'
      padBody={false}
      height="90vh"
      title="Roll your own"
    >
      {children}
    </AppWindow>
  )
}

export default GameWindow
