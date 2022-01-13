import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'generated/graphql';
import { getRandomHustler } from 'utils/HustlerConfig';
import DesktopWindow from 'components/DesktopWindow';
import RenderFromDopeId from 'components/hustler/RenderFromDopeId';
import Head from 'components/Head';
import Container from 'components/Container';
import LoadingBlock from 'components/LoadingBlock';

const HustlerContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  & > * {
    flex: 1;
  }
`;

const Dope = () => {
  const [hustlerConfig, _setHustlerConfig] = useState(getRandomHustler({}));
  const router = useRouter();
  const { id } = router.query;
  const { account } = useWeb3React();

  const { data, isFetching: loading } = useWalletQuery({
    where: {
      id: account,
    },
  });

  const title = `Hustler Preview: ${id}`;

  return (
    <DesktopWindow
      title={title}
      balance={data?.wallets?.edges![0]?.node?.paper}
      loadingBalance={loading}
    >
      <Head title={title} />
      {loading ? (
        <Container>
          <LoadingBlock />
          <LoadingBlock />
        </Container>
      ) : (
        <HustlerContainer bgColor={hustlerConfig.bgColor}>
          <RenderFromDopeId
            id={id?.toString() ?? '1'}
            sex={hustlerConfig.sex}
            body={hustlerConfig.body}
            hair={hustlerConfig.hair}
            facialHair={hustlerConfig.facialHair}
            bgColor={hustlerConfig.bgColor}
            zoomWindow={hustlerConfig.zoomWindow}
          />
        </HustlerContainer>
      )}
    </DesktopWindow>
  );
};

export default Dope;
