/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { getRandomDate } from 'utils/utils';
import { HustlerSex, HustlerCustomization } from 'utils/HustlerConfig';
import { media } from 'ui/styles/mixins';
import { PHRASES } from 'features/news/components/NewsHeader';
import { Share } from 'react-twitter-widgets';
import { Button, Grid, GridItem, Image } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Item, useHustlerQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { ZOOM_WINDOWS } from 'utils/HustlerConfig';
import AppWindow from 'components/AppWindow';
import AppWindowNavBar from 'components/AppWindowNavBar';
import DopeItem from 'features/dope/components/DopeItem';
import Head from 'components/Head';
import HustlerSpriteSheetWalk from 'components/hustler/HustlerSpriteSheetWalk';
import Link from 'next/link';
import LoadingBlock from 'components/LoadingBlock';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import ProfileCardHeader from 'features/profile/components/ProfileCardHeader';
import RenderFromItemIds from 'components/hustler/RenderFromItemIds';
import styled from '@emotion/styled';
import GearCard from 'features/profile/components/GearCard';
import { useHustlerRles } from 'hooks/render';

const Nav = () => (
  <AppWindowNavBar>
    <Link href="/inventory?section=Hustlers" passHref>
      <Button variant="navBar">Your Hustlers</Button>
    </Link>
    <Link href="/gangsta-party" passHref>
      <Button variant="navBar">
        All Hustlers
      </Button>
    </Link>
    <div
      css={css`
        position: absolute;
        right: 16px;
        bottom: 8px;
      `}
    >
      <Share
        url={typeof window !== 'undefined' ? window?.location.toString() : 'https://dopewars.gg'}
        options={{
          text: `${
            PHRASES[Math.floor(Math.random() * PHRASES.length)]
          } \n#hustlerFollowHustler @TheDopeWars`,
        }}
      />
    </div>
  </AppWindowNavBar>
);

const HustlerTitle = styled.h1`
  font-family: Dope !important;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 0;
  z-index: 2;
  padding: 16px 32px;
  text-align: center;
  color: white;
  background-color: black;
  border: 4px solid white;
`;
const HustlerImage = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  padding: 0 15%;
  bottom: 0px;
  right: 0px;
  top: 0px;
  ${media.tablet`
    padding: 0 5%;
    width: 100%;
  `}
`;
const MugshotContainer = styled.div`
  position: relative;
  height: 100%;
  min-height: 400px;
  background: #f2f2f2 url(/images/hustler/mugshot_bg.png) center center / contain no-repeat;
`;

// We receive things like 'FEMALE-BODY-2' from the API
const getBodyIndexFromMetadata = (bodyStringFromApi?: string) => {
  if (!bodyStringFromApi) return 0;
  const indexFromString = bodyStringFromApi.charAt(bodyStringFromApi.length - 1);
  return parseInt(indexFromString);
};

const Flex = () => {
  const router = useRouter();
  const { id: hustlerId } = router.query;
  const [hustlerConfig, setHustlerConfig] = useState({} as Partial<HustlerCustomization>);
  const [onChainImage, setOnChainImage] = useState('');

  const { data, isFetching: isLoading } = useHustlerQuery(
    {
      where: {
        id: String(hustlerId),
      },
    },
    {
      enabled: router.isReady && !!String(router.query.id),
    },
  );

  const itemRles = useHustlerRles(data?.hustlers?.edges?.[0]?.node);
  const items = useMemo<Item[]>(() => {
    const hustler = data?.hustlers?.edges?.[0]?.node;
    if (hustler) {
      // Order matters
      return [
        hustler.weapon,
        hustler.vehicle,
        hustler.drug,
        hustler.clothes,
        hustler.hand,
        hustler.waist,
        hustler.foot,
        hustler.neck,
        hustler.ring,
        hustler.accessory,
      ].filter(i => !!i) as Item[];
    }

    return [];
  }, [data]);

  useEffect(() => {
    if (data?.hustlers?.edges?.[0]?.node) {
      const h = data?.hustlers?.edges?.[0].node;

      if (h?.svg) setOnChainImage(h?.svg);
      setHustlerConfig({
        ...hustlerConfig,
        name: h?.name || '',
        title: h?.title || '',
        sex: (h?.sex.toLowerCase() || 'male') as HustlerSex,
        body: h.body?.id ? parseInt(h.body.id.split('-')[2]) : 0,
        hair: h.hair?.id ? parseInt(h.hair.id.split('-')[2]) : 0,
        facialHair: h.beard?.id ? parseInt(h.beard.id.split('-')[2]) : 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hustlerId]);

  const renderHustler = (zoomWindowIndex: 0 | 1 | 2 | 3) => {
    if (!itemRles) return;
    return (
      <RenderFromItemIds
        bgColor={hustlerConfig.bgColor}
        body={hustlerConfig.body}
        itemRles={itemRles}
        facialHair={hustlerConfig.facialHair}
        hair={hustlerConfig.hair}
        name={hustlerConfig.name}
        renderName={hustlerConfig.renderName}
        sex={hustlerConfig.sex}
        textColor={hustlerConfig.textColor}
        zoomWindow={ZOOM_WINDOWS[zoomWindowIndex]}
        ogTitle={hustlerConfig.title}
        dopeId={hustlerConfig.dopeId}
        isVehicle={zoomWindowIndex >= 2}
      />
    );
  };

  return (
    <AppWindow padBody={true} navbar={<Nav />} scrollable>
      <Head
        title={`Dope Wars Hustler Flex`}
        ogImage={`https://api.dopewars.gg/hustlers/${hustlerId}/sprites/composite.png`}
      />
      {isLoading && <LoadingBlock />}
      {!isLoading && itemRles && (
        <Grid
          templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
          gap="16px"
          justifyContent="center"
          alignItems="stretch"
          width="100%"
          padding="32px"
          paddingTop="8px"
        >
          <PanelContainer
            css={css`
              grid-column: unset;
              ${media.tablet`
                grid-column: 1 / 3;
              `}
            `}
          >
            <MugshotContainer>
              <HustlerTitle>
                {hustlerConfig.name}
                <br />
                {getRandomDate('01/01/1980')}
              </HustlerTitle>
              <HustlerImage>{renderHustler(1)}</HustlerImage>
            </MugshotContainer>
          </PanelContainer>
          <PanelContainer>
            <PanelBody>
              <Grid
                templateRows="repeat(2, 1fr)"
                gap="8"
                justifyContent="center"
                alignItems="stretch"
                width="100%"
              >
                <GridItem
                  display="flex"
                  justifyContent="center"
                  background="#000 url(/images/lunar_new_year_2022/explosion_city-bg.png) center / contain repeat-x"
                  paddingTop="24px"
                >
                  <HustlerSpriteSheetWalk id={hustlerId?.toString()} />
                </GridItem>
                <GridItem minWidth="256px">
                  <Image src={onChainImage} alt={hustlerConfig.name} />
                </GridItem>
              </Grid>
            </PanelBody>
          </PanelContainer>
          <PanelContainer>
            <ProfileCardHeader>Equipped Gear</ProfileCardHeader>
            <PanelBody
              css={css`
                background-color: var(--gray-800);
                flex: 2;
              `}
            >
              {items?.map(({ id, fullname, name, namePrefix, nameSuffix, suffix, augmented, type, tier }) => {
                return (
                  <DopeItem
                    key={id}
                    fullname={fullname}
                    name={name}
                    namePrefix={namePrefix}
                    nameSuffix={nameSuffix}
                    suffix={suffix}
                    augmented={augmented}
                    type={type}
                    color={DopeLegendColors[tier]}
                    isExpanded={true}
                    tier={tier}
                    showRarity={true}
                  />
                );
              })}
            </PanelBody>
          </PanelContainer>
          {items?.map(item => {
            return <GearCard item={item} key={item.id} />;
          })}
        </Grid>
      )}
    </AppWindow>
  );
};

export default Flex;
