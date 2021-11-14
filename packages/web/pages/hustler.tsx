import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'src/generated/graphql';
import AppWindow from 'components/AppWindow';
import ComingSoonDialog from 'components/ComingSoonDialog';
import Head from 'components/Head';
import Container from 'components/Container';
import LoadingBlock from 'components/LoadingBlock';

const Hustler = () => {
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });

  return (
    <AppWindow padBody={false} balance={data?.wallet?.paper}>
      <Head title="Create Your Hustler" />
      {loading ? (
        <Container>
          <LoadingBlock />
          <LoadingBlock />
        </Container>
      ) : (
        <ComingSoonDialog title="Under Construction">
          <p>
            <a
              className="textLink"
              href="https://dope-wars.notion.site/Dope-Wars-Ignition-e92fd2b6efeb4e4991c7df98f5553283"
            >
              Read the proposal for Dope Wars: Ignition
            </a>
          </p>
        </ComingSoonDialog>
      )}
    </AppWindow>
  );
};

export default Hustler;
