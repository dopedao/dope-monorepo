/* eslint-disable @next/next/no-img-element */
import { BigNumber } from 'ethers';
import { css } from '@emotion/react';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { getRandomDate } from 'utils/utils';
import { getRandomHustler, HustlerSex } from 'utils/HustlerConfig';
import { Item as DopeItemApiResponse } from 'generated/graphql';
import { ITEM_ORDER } from 'features/dope/components/DopeCardBody';
import { media } from 'ui/styles/mixins';
import { PHRASES } from 'features/news/components/DopePostHeader/index'
import { Share } from 'react-twitter-widgets';
import { Stack, Button, Grid, GridItem, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHustlerQuery } from 'generated/graphql';
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
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import styled from '@emotion/styled';
import GearCard from 'features/profile/components/GearCard';

const Nav = () => (
  <AppWindowNavBar>
    <Link href="/inventory?section=Hustlers" passHref>
      <Button variant="navBar">Your Hustlers</Button>
    </Link>
    {/* <Link href="/gangsta-party" passHref>
      <Button variant="navBar">
        Gangsta Party
      </Button>
    </Link> */}
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
  const [itemIds, setItemIds] = useState<BigNumber[]>();
  const [hustlerConfig, setHustlerConfig] = useState(getRandomHustler({}));
  const [onChainImage, setOnChainImage] = useState('');
  const [hustlerItems, setHustlerItems] = useState<any>([]);

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

  useEffect(() => {
    if (data?.hustlers.edges?.[0]?.node) {
      const h = data.hustlers.edges[0].node;
      console.log(h);
      setHustlerConfig({
        ...hustlerConfig,
        name: h?.name || '',
        title: h?.title || '',
        sex: (h?.sex.toLowerCase() || 'male') as HustlerSex,
        body: getBodyIndexFromMetadata(h?.body?.id),
      });
      setHustlerItems([
        h.clothes,
        h.drug,
        h.foot,
        h.hand,
        h.neck,
        h.ring,
        h.accessory,
        h.vehicle,
        h.waist,
        h.weapon,
      ]);
      if (h?.svg) setOnChainImage(h?.svg);
      setItemIds([
        BigNumber.from(h.vehicle?.id),
        BigNumber.from(h.drug?.id),
        BigNumber.from(h.clothes?.id),
        BigNumber.from(h.waist?.id),
        BigNumber.from(h.foot?.id),
        BigNumber.from(h.ring?.id),
        BigNumber.from(h.hand?.id),
        BigNumber.from(h.weapon?.id),
        BigNumber.from(h.neck?.id),
        BigNumber.from(h.accessory?.id),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hustlerId]);

  const renderHustler = (zoomWindowIndex: 0 | 1 | 2 | 3) => {
    if (!itemIds) return;
    return (
      <RenderFromItemIds
        bgColor={hustlerConfig.bgColor}
        body={hustlerConfig.body}
        facialHair={hustlerConfig.facialHair}
        hair={hustlerConfig.hair}
        itemIds={itemIds}
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

  const sortedHustlerItems = hustlerItems.sort(
    function (a: DopeItemApiResponse, b: DopeItemApiResponse) {
      if (ITEM_ORDER.indexOf(a.type) > ITEM_ORDER.indexOf(b.type)) {
        return 1;
      } else {
        return -1;
      }
    }
  );

  return (
    <AppWindow padBody={true} navbar={<Nav />} scrollable>
      <Head
        title={`Dope Wars Hustler Flex`}
        ogImage={`https://api.dopewars.gg/hustlers/${hustlerId}/sprites/composite.png`}
      />
      {isLoading && <LoadingBlock />}
      {!isLoading && itemIds && (
        <Stack>
          <StackedResponsiveContainer
            css={css`
              padding-bottom: 8px !important;
            `}
          >
            <PanelContainer
              css={css`
                flex: 2 !important;
              `}
            >
              <MugshotContainer>
                <HustlerTitle>
                  {hustlerConfig.name}
                  <br />
                  {getRandomDate('01/01/1980', '01/01/2020')}
                </HustlerTitle>
                <HustlerImage>{renderHustler(1)}</HustlerImage>
              </MugshotContainer>
            </PanelContainer>
            <PanelContainer
              css={css`
                flex: 1 !important;
              `}
            >
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
                  >
                    <HustlerSpriteSheetWalk id={hustlerId?.toString()} />
                  </GridItem>
                  <GridItem minWidth="256px">
                    <Image src={onChainImage} alt={hustlerConfig.name} />
                  </GridItem>
                </Grid>
              </PanelBody>
            </PanelContainer>
          </StackedResponsiveContainer>
          <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
            gap="16px"
            justifyContent="center"
            alignItems="stretch"
            width="100%"
            padding="32px"
            paddingTop="8px"
          >
            <PanelContainer>
              <ProfileCardHeader>Equipped Gear</ProfileCardHeader>
              <PanelBody
                css={css`
                  background-color: var(--gray-800);
                  flex: 2;
                `}
              >
                {sortedHustlerItems.map(
                  ({
                    id,
                    name,
                    namePrefix,
                    nameSuffix,
                    suffix,
                    augmented,
                    type,
                    tier,
                  }: DopeItemApiResponse) => {
                    return (
                      // @ts-ignore
                      <DopeItem
                        key={id}
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
                  },
                )}
              </PanelBody>
            </PanelContainer>
            {sortedHustlerItems.map((item: DopeItemApiResponse) => {
              return <GearCard item={item} key={item.id} />
            })}
          </Grid>
        </Stack>
      )}
    </AppWindow>
  );
};

export default Flex;
