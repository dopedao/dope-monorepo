/* eslint-disable @next/next/no-img-element */
// import { css } from '@emotion/react';
// import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { Grid, GridItem, Image, Box, Flex, Button } from '@chakra-ui/react';
import { HustlerSex, HustlerCustomization } from 'utils/HustlerConfig';
import { Item, useHustlerQuery } from 'generated/graphql';
import { media } from 'ui/styles/mixins';
import { useEffect, useMemo, useState } from 'react';
import { useHustler } from 'hooks/contracts';
import { useHustlerRles } from 'hooks/render';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import AppWindow from 'components/AppWindow';
// import DopeItem from 'features/dope/components/DopeItem';
// import GearCard from 'features/profile/components/GearCard';
import Head from 'components/Head';
// import HustlerFlexNavBar from 'features/hustlers/components/HustlerFlexNavBar';
// import HustlerMugShot from 'features/hustlers/components/HustlerMugShot';
// import HustlerSpriteSheetWalk from 'components/hustler/HustlerSpriteSheetWalk';
import LoadingBlock from 'components/LoadingBlock';
import useMobile, { returnBreakpoint } from 'ui/styles/breakpoints';
// import PanelBody from 'components/PanelBody';
// import PanelContainer from 'components/PanelContainer';
// import ProfileCardHeader from 'features/profile/components/ProfileCardHeader';
// import { BigNumber } from 'ethers';

// We receive things like 'FEMALE-BODY-2' from the API
// const getBodyIndexFromMetadata = (bodyStringFromApi?: string) => {
//   if (!bodyStringFromApi) return 0;
//   const indexFromString = bodyStringFromApi.charAt(bodyStringFromApi.length - 1);
//   return parseInt(indexFromString);
// };

const FlexPage = () => {
  const hustler = useHustler();
  const router = useRouter();
  const { account } = useWeb3React();

  const [hustlerConfig, setHustlerConfig] = useState({} as Partial<HustlerCustomization>);
  const [onChainImage, setOnChainImage] = useState('');
  const { id: hustlerId } = router.query;

  const [isOwnedByConnectedAccount, setIsOwnedByConnectedAccount] = useState(false);

  const {isMobile} = useMobile()

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
    <AppWindow padBody={true} scrollable title='SWAPMEET.EXE' subTitle='500k $PAPER | clicksave.eth'>
      <Head
        title={`SWAPMEET.EXE`}
        ogImage={`https://api.dopewars.gg/hustlers/${hustlerId}/sprites/composite.png`}
      />
      {isLoading && <LoadingBlock />}
      {!isLoading && itemRles && (
        <Box display="flex" background={"white"} minHeight="100%" p={'5'} flexDirection={isMobile ? 'column' : 'row'}>
          <Box flex={1} mb={isMobile ? "5" : "0"} width="full" display="flex" flexDirection={"column"}>
            <Box display="flex" alignItems="center" justifyContent="space-between" width={'full'} mb="5">
              <Box display="flex" alignItems="center">
                <Box><Image src="/images/hustler/backIco.svg" alt="back" /></Box>
                <Box marginLeft="0.5">Back</Box>
              </Box>
              <Box>OG Calico</Box>
            </Box>
            <Box display="flex" flexDirection="column" borderRadius={'3'} overflow="hidden" border="1px solid black" mb="3">
              <Image src="/images/hustler/vote_male.png" alt="png" />
              <Box color="#979999" width={'full'} textAlign="center" py="1" bgColor="#434345"  borderTop="1px solid black">Not For Sale</Box>
            </Box>
            <Box display={'flex'} justifyContent="space-between" width={'full'} mb="5">
              <Button ><Image src="/images/hustler/download.svg" alt="download" /></Button>
              <Button ><Image src="/images/hustler/camera.svg" alt="download" /></Button>
              <Button ><Image src="/images/hustler/share.svg" alt="download" /></Button>
              <Button ><Image src="/images/hustler/edit.svg" alt="download" /></Button>
              <Button ><Image src="/images/hustler/setting.svg" alt="download" /></Button>
            </Box>
            <Box display={"flex"} width={'full'} mb="5">
              <Button width={"100%"}>Create Swap</Button>
            </Box>
            <Box display={"flex"} width={'full'}>
              <Button width={"100%"}>Transfer</Button>
            </Box>
          </Box>
          <Box flex={isMobile ? 1 : 2} width="full" ml={isMobile ? "0" : "5"} display={'flex'} flexDirection="column">
            <Box width="full" display={'flex'} mb="5" flexDirection="column" overflow={'hidden'} borderRadius={'3'} border={'1px solid #cfd9d4'}>
              <Box p="2" bgColor="#EDEFEE" display={'flex'} justifyContent="space-between" borderBottom={"1px solid #cfd9d4"}>
                <Box display='flex'>
                  <Image src="/images/hustler/setting.svg" />
                  <Box ml="2">DETAILS</Box>
                </Box>
                <Image src="/images/hustler/expanded.svg" />
              </Box>
              <Box p="2" display={'flex'} borderBottom={"1px solid #cfd9d4"} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>NAME</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box>Hobbes</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} borderBottom={"1px solid #cfd9d4"} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>ID</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box>#88 OG</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} borderBottom={"1px solid #cfd9d4"} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>TITLE</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box>Kid of the Game Feared</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} borderBottom={"1px solid #cfd9d4"} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>RESPECT</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box>100</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>OWNER</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Image src="/images/hustler/thumbnail.svg" />
                  <Box ml="2">clicksave.eth (you)</Box>
                </Box>
              </Box>
            </Box>
            <Box width="full" display={'flex'} mb="5" flexDirection="column" overflow={'hidden'} borderRadius={'3'} border={'1px solid #cfd9d4'}>
              <Box p="2" bgColor="#EDEFEE" display={'flex'} justifyContent="space-between" borderBottom={"1px solid #cfd9d4"}>
                <Box display='flex'>
                  <Image src="/images/hustler/setting.svg" />
                  <Box ml="2">GEAR</Box>
                </Box>
                <Image src="/images/hustler/expanded.svg" />
              </Box>
              <Box p="2" display={'flex'} borderBottom={"1px solid #cfd9d4"} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>WEAPON</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">AK 47</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} borderBottom={"1px solid #cfd9d4"} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>VEHICLE</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">ATV</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} borderBottom={"1px solid #cfd9d4"} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>DRUG</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} bgColor="#4780F7" border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">LSD from Big Smoke</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} borderBottom={"1px solid #cfd9d4"} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>CLOTHES</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} bgColor="#4780F7" border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">Black Hoodie from Murdertown</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>HANDS</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">Studed Leather Glove</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>SHOES</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} bgColor="#4780F7" border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">Reebok Classics from Chicago</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>NECK</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">Gold Chain</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>RING</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">Silver Ring</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>WAIST</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} bgColor="#FEFC66" border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">"John E. Dell Sin" Taser Holster from Oakland</Box>
                </Box>
              </Box>
              <Box p="2" display={'flex'} >
                <Box color="#919191" flex={isMobile ? 2 : 1}>ACCESSORY</Box>
                <Box display='flex' alignItems="center" flex={5}>
                  <Box borderRadius={999} bgColor="#EC6F38" border="1px solid black" width={"3"} height={"3"}/>
                  <Box ml="2">“Celebratory” Dragon Mask from Chinatown</Box>
                </Box>
              </Box>
            </Box>
            <Box width="full" display={'flex'} mb="5" flexDirection="column" overflow={'hidden'} borderRadius={'3'} border={'1px solid #cfd9d4'}>
              <Box p="2" bgColor="#EDEFEE" display={'flex'} justifyContent="space-between" borderBottom={"1px solid #cfd9d4"}>
                <Box display='flex'>
                  <Image src="/images/hustler/listing.svg" />
                  <Box ml="2">LISTINGS</Box>
                </Box>
                <Image src="/images/hustler/expand.svg" />
              </Box>
            </Box>
            <Box width="full" display={'flex'} mb="5" flexDirection="column" overflow={'hidden'} borderRadius={'3'} border={'1px solid #cfd9d4'}>
              <Box p="2" bgColor="#EDEFEE" display={'flex'} justifyContent="space-between" borderBottom={"1px solid #cfd9d4"}>
                <Box display='flex'>
                  <Image src="/images/hustler/swap.svg" />
                  <Box ml="2">OFFERS</Box>
                </Box>
                <Image src="/images/hustler/expand.svg" />
              </Box>
            </Box>
            <Box width="full" display={'flex'} mb="5" flexDirection="column" overflow={'hidden'} borderRadius={'3'} border={'1px solid #cfd9d4'}>
              <Box p="2" bgColor="#EDEFEE" display={'flex'} justifyContent="space-between" borderBottom={"1px solid #cfd9d4"}>
                <Box display='flex'>
                  <Image src="/images/hustler/history.svg" />
                  <Box ml="2">ACTIVITY</Box>
                </Box>
                <Image src="/images/hustler/expand.svg" />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </AppWindow>
  );
};

export default FlexPage;
