import { useMemo } from 'react';
import { css } from '@emotion/react';
import { Stack, Image } from '@chakra-ui/react';
import AppWindowOptimism from 'components/AppWindowOptimism';
import EventHeader from 'components/lunar_new_year/EventHeader';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useItemQuery } from 'generated/graphql';
import CardContainer from 'features/profile/components/CardContainer';
import ProfileCard from 'features/profile/components/ProfileCard';
import ProfileCardHeader from 'features/profile/components/ProfileCardHeader';
import PanelBody from 'components/PanelBody';

const FireworksShow = styled.div`
  margin-top: -48px;
  display: flex;
  gap: 0;
  align-items: space-between;
  justify-content: center;
  height: 100%;
  img {
    max-height: 70vh;
  }
`;
const LogoContainer = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  img {
    margin: auto;
    width: 50%;
  }
`;

const Item = ({ id }: { id: string }) => {
  const { data, isLoading } = useItemQuery({
    where: { id },
  });

  const item = data?.items.edges![0]?.node;

  return (
    <CardContainer>
      <ProfileCard>
        {isLoading || !item ? (
          'Loading'
        ) : (
          <>
            <ProfileCardHeader>
              <div>{item.fullname}</div>
            </ProfileCardHeader>
            <PanelBody>
              <Stack>
                <Image
                  borderRadius="md"
                  src={item.svg || item.base?.svg || ''}
                  alt={item.fullname}
                />
                <span
                  css={css`
                    height: 2.5em;
                  `}
                >
                  Title: {item.fullname}
                </span>
              </Stack>
            </PanelBody>
          </>
        )}
      </ProfileCard>
    </CardContainer>
  );
};

const MintSuccess = () => {
  const router = useRouter();
  const { items } = router.query;

  const parsed: { typ: number; id: string }[] = useMemo(() => {
    if (items) {
      return JSON.parse(items as string);
    }

    return [];
  }, [items]);

  return (
    <AppWindowOptimism
      requiresWalletConnection
      title="Success!"
      background="#000 url(/images/lunar_new_year_2022/explosion_city-bg.png) center / contain repeat-x"
      padBody={false}
      scrollable={true}
    >
      <EventHeader />
      <LogoContainer>
        <Image src="/images/Logo-Gold.png" alt="Dope Wars" />
      </LogoContainer>
      <FireworksShow>
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
      </FireworksShow>
      {parsed.map((item, i) => {
        if (item.typ === 1) {
          return <Item key={i} id={item.id} />;
        } else {
          return <div key={i}> got 1k paper</div>;
        }
      })}
    </AppWindowOptimism>
  );
};

export default MintSuccess;
