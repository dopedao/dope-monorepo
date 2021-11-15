import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'src/generated/graphql';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import DisconnectWallet from 'components/DisconnectWallet';
import Container from 'components/Container';
import LoadingBlock from 'components/LoadingBlock';

const Wallet = () => {
  const router = useRouter();
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });

  const closeApp = () => {
    router.replace('/');
  };

  return (
    <AppWindow
      navbar={<DopeWarsExeNav />}
      requiresWalletConnection={true}
      padBody={false}
      balance={data?.wallet?.paper}
      loadingBalance={loading}
    >
      <Head />
      {loading ? (
        <Container>
          <LoadingBlock />
          <LoadingBlock />
        </Container>
      ) : (
        <DisconnectWallet onClose={() => closeApp()} />
      )}
    </AppWindow>
  );
};
export default Wallet;
