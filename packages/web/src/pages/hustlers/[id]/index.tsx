/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { Grid, GridItem, Image } from '@chakra-ui/react';
import { HustlerSex, HustlerCustomization } from 'utils/HustlerConfig';
import { Item, ItemItemTier, useHustlerQuery } from 'generated/graphql';
import { media } from 'ui/styles/mixins';
import { useEffect, useMemo, useState } from 'react';
import { getHustlerRles } from 'hooks/render';
import { useRouter } from 'next/router';
import AppWindow from 'components/AppWindow';
import DopeItem from 'features/dope/components/DopeItem';
import GearCard from 'features/profile/components/GearCard';
import Head from 'components/Head';
import HustlerFlexNavBar from 'features/hustlers/components/HustlerFlexNavBar';
import HustlerMugShot from 'features/hustlers/components/HustlerMugShot';
import HustlerSpriteSheetWalk from 'features/hustlers/components/HustlerSpriteSheetWalk';
import LoadingBlock from 'components/LoadingBlock';
import NakedHustlerWarning from 'features/dope/components/NakedHustlerWarning';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import ProfileCardHeader from 'features/profile/components/ProfileCardHeader';
import { MAINNET_API_URL } from 'utils/constants';
import { NoSSR } from 'components/NoSSR';

// web3
import { useHustler } from 'hooks/contracts';
import { useAccount } from 'wagmi';
import { useOptimism } from 'hooks/web3';

// We receive things like 'FEMALE-BODY-2' from the API
const getBodyIndexFromMetadata = (bodyStringFromApi?: string) => {
  if (!bodyStringFromApi) return 0;
  const indexFromString = bodyStringFromApi.charAt(bodyStringFromApi.length - 1);
  return parseInt(indexFromString);
};

const Flex = () => {
  useOptimism(); // ensure on proper chain
  const hustler = useHustler();
  const router = useRouter();

  const { address: account } = useAccount();
  const [hustlerConfig, setHustlerConfig] = useState({} as Partial<HustlerCustomization>);
  const [onChainImage, setOnChainImage] = useState('');

  const [isOwnedByConnectedAccount, setIsOwnedByConnectedAccount] = useState(false);

  // Check if hustlerId is not a number
  let { id: hustlerId } = router.query;
  if (Number.isNaN(parseInt(hustlerId?.toString() ?? ''))) {
    hustlerId = '1';
  }

  // Live check Contract see if this Hustler is owned by connected Account
  useEffect(() => {
    let isMounted = true;
    if (hustler && account && hustlerId && isMounted) {
      hustler.balanceOf(account, hustlerId.toString()).then(value => {
        setIsOwnedByConnectedAccount(value === BigInt(1));
      });
    }
    return () => {
      isMounted = false;
    };
    // Empty dependency array so we only run it once,
    // otherwise we're stuck with infinite fetches and re-renders.
  }, [hustler, hustlerId, account]);

  // Grab Hustler info from API
  const { data, isFetching: isLoading } = useHustlerQuery(
    {
      where: {
        id: String(hustlerId),
      },
    },
    {
      queryKey: ['hustler', hustlerId],
      enabled: router.isReady && !!String(router.query.id),
      // to grab equipment updates if they happen
      refetchInterval: 25_000,
    },
  );

  const hustlerData = data?.hustlers?.edges?.[0]?.node;
  // use this to avoid showing loading block each time
  // during refetch
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [itemRles, setItemRles] = useState<string[] | undefined>([]);

  // Set Hustler Config and SVG Image after data returns
  useEffect(() => {
    if (hustlerData) {
      if (hustlerData?.svg) setOnChainImage(hustlerData?.svg);
      setHustlerConfig(prevConfig => ({
        ...prevConfig,
        name: hustlerData.name || '',
        title: hustlerData.title || '',
        sex: (hustlerData.sex.toLowerCase() || 'male') as HustlerSex,
        body: hustlerData.body?.id ? parseInt(hustlerData.body.id.split('-')[2]) : 0,
        hair: hustlerData.hair?.id ? parseInt(hustlerData.hair.id.split('-')[2]) : 0,
        facialHair: hustlerData.beard?.id ? parseInt(hustlerData.beard.id.split('-')[2]) : 0,
      }));
    }
  }, [hustlerData]); // Remove hustlerConfig from the dependencies

  useEffect(() => {
    if (hustlerData) {
      setItemRles(getHustlerRles(hustlerData));
      setHasLoadedOnce(true);
    }
  }, [hustlerData]);

  const items = useMemo<Item[]>(() => {
    if (hustlerData) {
      const h = hustlerData;
      // Order matters
      return [
        h.weapon,
        h.vehicle,
        h.drug,
        h.clothes,
        h.hand,
        h.waist,
        h.foot,
        h.neck,
        h.ring,
        h.accessory,
      ].filter(i => !!i) as Item[];
    }
    return [];
  }, [hustlerData]);

  return (
    <AppWindow padBody={true} navbar={<HustlerFlexNavBar />} scrollable>
      <Head
        title={'Dope Wars Hustler Flex'}
        ogImage={`${MAINNET_API_URL}/hustlers/${hustlerId}/sprites/composite.png`}
      />
      {isLoading && !hasLoadedOnce && <LoadingBlock />}
      {hasLoadedOnce && itemRles && (
        <NoSSR>
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
            {items.length === 0 && <NakedHustlerWarning />}
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
                        const nTier = tier ?? ItemItemTier.Common;
                        return (
                          <DopeItem
                            key={id}
                            name={name}
                            namePrefix={namePrefix}
                            nameSuffix={nameSuffix}
                            suffix={suffix}
                            augmented={augmented}
                            type={type}
                            color={DopeLegendColors[nTier]}
                            isExpanded={true}
                            tier={nTier}
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
                  hustlerId={BigInt(hustlerId?.toString() || 0)}
                />
              );
            })}
          </Grid>
        </NoSSR>
      )}
    </AppWindow>
  );
};

export default Flex;
