import { useMemo } from 'react';
import { css } from '@emotion/react';
import { Box, Button, Stack, Image } from '@chakra-ui/react';
import AppWindowOptimism from 'components/AppWindowOptimism';
import EventHeader from 'components/lunar_new_year/EventHeader';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useItemQuery } from 'generated/graphql';
import ProfileCard from 'features/profile/components/ProfileCard';
import PanelTitleBar from 'components/PanelTitleBar';
import PanelBody from 'components/PanelBody';
import Link from 'next/link';
import Fireworks from 'components/lunar_new_year/Fireworks';
import { media } from 'ui/styles/mixins';

const FireworksShow = styled.div`
  position: absolute;
  z-index: 0;
  top: 15%;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 0;
  align-items: space-between;
  justify-content: center;
  img {
    max-height: 70vh;
  }
  @keyframes disappear {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  animation: disappear 1s forwards 5.5s;
`;
const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 60%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, -100%);
  img {
    margin: auto;
    width: 95%;
    ${media.tablet`
      width: 66%;
    `}
  }
  @keyframes scroll-in {
    0% {
      top: 0;
      opacity: 1;
    }
    99% {
      top: 60%;
      opacity: 1;
    }
    100% {
      top: 60%;
      opacity: 0;
    }
  }
  animation: scroll-in 5.2s linear forwards 0s;
`;
const MessageContainer = styled.div`
  text-align: center;
  padding: 16px;
  margin: 16px;
  opacity: 0;
  position: relative;
  z-index: 5;
  ${media.tablet`
    padding: 32px 64px;
    margin: 32px 25%;
  `}
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: appear 1s forwards 5.5s;
  h3 {
    color: white;
    margin-bottom: 1em;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 32px;
    border-radius: 8px;
  }
`;

const Item = ({ id }: { id: string }) => {
  const { data, isLoading } = useItemQuery({
    where: { id },
  });

  const item = data?.items.edges![0]?.node;

  return (
    <ProfileCard>
      {isLoading || !item ? (
        'Loading'
      ) : (
        <>
          {/* <PanelTitleBar centered>
            {item.fullname}
          </PanelTitleBar> */}
          <PanelBody>
            <Stack>
              <Image borderRadius="md" src={item.svg || item.base?.svg || ''} alt={item.fullname} />
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
      <Fireworks />
      <Box
        css={css`
          display: flex;
          width: 100%;
          flex-direction: column;
        `}
      >
        <EventHeader />
        <MessageContainer>
          <h3>Your gift has been revealed</h3>
          <Box
            css={css`
              display: flex;
              flex-direction: column;
              gap: 16px;
              & > * {
                flex: 1;
              }
            `}
          >
            {parsed.map((item, i) => {
              if (item.typ === 1) {
                return <Item key={i} id={item.id} />;
              } else {
                return (
                  <Box key={i}>
                    <ProfileCard>
                      <PanelTitleBar centered>
                        <Box>YOU WON 1000 $PAPER</Box>
                      </PanelTitleBar>
                      <Image src="/images/desktop/PAPER.png" alt="1000 $PAPER" />
                    </ProfileCard>
                  </Box>
                );
              }
            })}
            <Link href="/swap-meet/inventory?section=Gear" passHref>
              <Button variant="cny">View your gifts</Button>
            </Link>
            <Link href="/lunar-new-year?section=mask" passHref>
              <Button
                variant="cny"
                css={css`
                  margin-top: 8px;
                `}
              >
                Buy a Rare Mask
              </Button>
            </Link>
          </Box>
        </MessageContainer>
      </Box>
      <LogoContainer>
        <Image src="/images/Logo-Gold.png" alt="Dope Wars" />
      </LogoContainer>
      <FireworksShow>
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
        <Image src="/images/lunar_new_year_2022/firecrackers.gif" alt="Fireworks" />
      </FireworksShow>
    </AppWindowOptimism>
  );
};

export default MintSuccess;
