import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'src/generated/graphql';
import { HustlerInitConfig } from 'src/HustlerConfig';
import { useRouter } from 'next/router';
import DesktopWindow from 'components/DesktopWindow';
import Head from 'components/Head';
import Container from 'components/Container';
import LoadingBlock from 'components/LoadingBlock';
import Steps from 'features/hustlers/modules/Steps';
import HustlerProvider from 'features/hustlers/HustlerProvider';

const ApproveSpend = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const router = useRouter();
  const { id } = router.query;
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });

  const title = `Hustler Preview: ${id}`;

  return (
    <DesktopWindow title={title} balance={data?.wallet?.paper} loadingBalance={loading}>
      <Head title={title} />
      {loading ? (
        <Container>
          <LoadingBlock />
          <LoadingBlock />
        </Container>
      ) : (
        <HustlerProvider>
          <Steps hustlerConfig={hustlerConfig} id={id} />
        </HustlerProvider>
      )}
    </DesktopWindow>
  );
};

export default ApproveSpend;
