/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { Grid, GridItem, Image } from '@chakra-ui/react';
import { HustlerSex, HustlerCustomization } from 'utils/HustlerConfig';
import { Item, useHustlerQuery } from 'generated/graphql';
import { media } from 'ui/styles/mixins';
import { useEffect, useMemo, useState } from 'react';
import { useHustler } from 'hooks/contracts';
import { useHustlerRles } from 'hooks/render';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import AppWindow from 'components/AppWindow';
import DopeItem from 'features/dope/components/DopeItem';
import GearCard from 'features/profile/components/GearCard';
import Head from 'components/Head';
import HustlerFlexNavBar from 'features/hustlers/components/HustlerFlexNavBar';
import HustlerMugShot from 'features/hustlers/components/HustlerMugShot';
import HustlerSpriteSheetWalk from 'components/hustler/HustlerSpriteSheetWalk';
import LoadingBlock from 'components/LoadingBlock';
import NakedHustlerWarning from 'features/dope/components/NakedHustlerWarning';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import ProfileCardHeader from 'features/profile/components/ProfileCardHeader';
import { BigNumber } from 'ethers';
import { API_URI } from 'utils/constants';

// We receive things like 'FEMALE-BODY-2' from the API
const getBodyIndexFromMetadata = (bodyStringFromApi?: string) => {
  if (!bodyStringFromApi) return 0;
  const indexFromString = bodyStringFromApi.charAt(bodyStringFromApi.length - 1);
  return parseInt(indexFromString);
};

const Flex = () => {
  const hustler = useHustler();
  const router = useRouter();
  const { account } = useWeb3React();

  const [hustlerConfig, setHustlerConfig] = useState({} as Partial<HustlerCustomization>);
  const [onChainImage, setOnChainImage] = useState('');
  const { id: hustlerId } = router.query;

  const [isOwnedByConnectedAccount, setIsOwnedByConnectedAccount] = useState(false);

  // Check Contract see if this Hustler is owned by connected Account
  useEffect(() => {
    let isMounted = true;
    if (hustler && account && hustlerId && isMounted) {
      hustler.balanceOf(account, hustlerId.toString()).then(value => {
        setIsOwnedByConnectedAccount(value.eq(1));
      });
    }
    return () => {
      isMounted = false;
    };
  }, [hustler, account, hustlerId]);

  // Grab Hustler info from API
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
        bgColor: `#${h?.background}`,
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
        ogImage={`${API_URI[1]}/hustlers/${hustlerId}/sprites/composite.png`}
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
              background-color: ${hustlerConfig.bgColor};
              padding: 16px;
              display: flex;
              align-items: center;
              ${media.tablet`
                grid-column: 1 / 3;
              `}
            `}
          >
            <Image src={onChainImage} alt={hustlerConfig.name} flex="1" />
          </PanelContainer>
          <PanelContainer>
            <PanelBody>
              <Grid
                templateRows="2fr 1fr"
                gap="8"
                justifyContent="center"
                alignItems="stretch"
                width="100%"
              >
                <GridItem
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-end"
                  paddingBottom="30px"
                  background="#000 url(/images/lunar_new_year_2022/explosion_city-bg.png) center / contain repeat-x"
                  overflow="hidden"
                >
                  <HustlerSpriteSheetWalk id={hustlerId?.toString()} />
                </GridItem>
                <GridItem minWidth="256px">
                  <HustlerMugShot hustlerConfig={hustlerConfig} itemRles={itemRles} />
                </GridItem>
              </Grid>
            </PanelBody>
          </PanelContainer>
          {items.length == 0 && (
            <NakedHustlerWarning />
          )}
          {items.length > 0 && (
            <PanelContainer>
              <ProfileCardHeader>Equipped Gear</ProfileCardHeader>
              <PanelBody
                css={css`
                  background-color: var(--gray-800);
                  flex: 2;
                `}
              >
                {items.length > 0 &&
                  items?.map(
                    ({ id, name, namePrefix, nameSuffix, suffix, augmented, type, tier }) => {
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
                    },
                  )}
              </PanelBody>
            </PanelContainer>
          )}
          {items?.map(item => {
            return (
              <GearCard
                item={item}
                key={item.id}
                showUnEquipFooter={isOwnedByConnectedAccount}
                hustlerId={BigNumber.from(hustlerId)}
              />
            );
          })}
        </Grid>
      )}
    </AppWindow>
  );
};

export default Flex;
