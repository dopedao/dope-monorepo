/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { HustlerSex, HustlerCustomization } from 'utils/HustlerConfig';
import { media } from 'ui/styles/mixins';
import { Grid, GridItem, Image } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Item, useHustlerQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import AppWindow from 'components/AppWindow';
import DopeItem from 'features/dope/components/DopeItem';
import Head from 'components/Head';
import HustlerSpriteSheetWalk from 'components/hustler/HustlerSpriteSheetWalk';
import LoadingBlock from 'components/LoadingBlock';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import ProfileCardHeader from 'features/profile/components/ProfileCardHeader';
import GearCard from 'features/profile/components/GearCard';
import { useHustlerRles } from 'hooks/render';
import HustlerFlexNavBar from 'features/hustlers/components/HustlerFlexNavBar';
import HustlerMugShot from 'features/hustlers/components/HustlerMugShot';

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

  const [
    isOwnedByConnectedAccount, setIsOwnedByConnectedAccount
  ] = useState(false);

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

  // Set Hustler Config and SVG Image after data returns
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

  return (
    <AppWindow padBody={true} navbar={<HustlerFlexNavBar />} scrollable>
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
            <HustlerMugShot hustlerConfig={hustlerConfig} itemRles={itemRles} />
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
              {items?.map(({ id, name, namePrefix, nameSuffix, suffix, augmented, type, tier }) => {
                return (
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
              })}
            </PanelBody>
          </PanelContainer>
          {items?.map(item => {
            return <GearCard 
              item={item} 
              key={item.id} 
              showUnEquipFooter={isOwnedByConnectedAccount}
            />;
          })}
        </Grid>
      )}
    </AppWindow>
  );
};

export default Flex;
