import { useWeb3React } from '@web3-react/core';
import AppWindow from '../components/AppWindow';
import ComingSoon from '../components/ComingSoon';
import Head from '../components/Head';

export default function Hustler() {
  const { account } = useWeb3React();

  return (
    <AppWindow padBody={false}>
      <Head title="Create Your Hustler" />
      <ComingSoon />
    </AppWindow>
  );
}
