import DopeWarsExeNav from 'components/DopeWarsExeNav';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';

import Container from './components/Container';
import Drugs from './components/Drugs';
import { useStarknet } from '@starknet-react/core';

const GameWindow = () => {
  const { account } = useStarknet();
  console.log(account);
  return (
    <AppWindow
      background="#202221"
      padBody={false}
      scrollable={false}
      height="90vh"
      title="Roll your own"
    >
      {/* <Head title="ROLL YOUR OWN" /> */}
      <Drugs />
    </AppWindow>
  );
};

export default GameWindow;
