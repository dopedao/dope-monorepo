import styled from '@emotion/styled';
import { useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'src/generated/graphql';
import { HustlerInitConfig } from 'src/HustlerConfig';
import { useRouter } from 'next/router';
import DesktopWindow from 'components/DesktopWindow';
import RenderFromLootId from 'components/hustler/RenderFromLootId';
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

const Loot = () => {
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
        <HustlerContainer bgColor={hustlerConfig.bgColor}>
          <RenderFromLootId
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

export default Loot;
