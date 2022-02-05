/* eslint-disable @next/next/no-img-element */
import { BigNumber } from 'ethers';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import styled from '@emotion/styled';
import { getRandomDate } from 'utils/utils';
import { getRandomHustler, HustlerSex } from 'utils/HustlerConfig';
import { Stack, Button, Grid, GridItem, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHustlerQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { ZOOM_WINDOWS } from 'utils/HustlerConfig';
import AppWindow from 'components/AppWindow';
import AppWindowNavBar from 'components/AppWindowNavBar';
import Head from 'components/Head';
import Link from 'next/link';
import LoadingBlock from 'components/LoadingBlock';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import RenderFromItemIds from 'components/hustler/RenderFromItemIds';
import HustlerSpriteSheetWalk from 'components/hustler/HustlerSpriteSheetWalk';
import { Share } from 'react-twitter-widgets';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const Nav = () => (
  <AppWindowNavBar>
    <Link href="/inventory?section=Hustlers" passHref>
      <Button variant="navBar">
        Your Hustlers
      </Button>
    </Link>
    {/* <Link href="/gangsta-party" passHref>
      <Button variant="navBar">
        Gangsta Party
      </Button>
    </Link> */}
    <div css={css`position:absolute;right:16px;bottom:8px;`}>
      <Share
        url={window.location.toString()}
        options={{ 
          text: `${PHRASES[Math.floor(Math.random()*PHRASES.length)]} \n#hustlerFollowHustler @TheDopeWars`,
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
  text-align:center;
  color: white;
  background-color: black;
  border: 4px solid white;
`
const HustlerImage = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  padding: 0 15%;
  bottom:0px;
  right:0px;
  top: 0px;
  ${media.tablet`
    padding: 0 5%;
    width: 100%;
  `}
`
const MugshotContainer = styled.div`
  position: relative;
  height: 100%;
  min-height: 400px;
  background: #f2f2f2 url(/images/hustler/mugshot_bg.png) center center / contain no-repeat;
`

// We receive things like 'FEMALE-BODY-2' from the API
const getBodyIndexFromMetadata = (bodyStringFromApi?: string) => {
  if (!bodyStringFromApi) return 0;
  const indexFromString = bodyStringFromApi.charAt(bodyStringFromApi.length-1);
  return parseInt(indexFromString);
}

const PHRASES = [
  "This is how we FLEX 💪",
  "🚀 $PAPER to the moon",
  "🕹 WEN GAME 🕹",
  "Devs always doing something",
  "Based devs",
  "Welcome to the MURDERVERSE",
  "Hustle Hard"
];

const Flex = () => {

  const router = useRouter();
  const {id: hustlerId} = router.query;
  const [itemIds, setItemIds] = useState<BigNumber[]>();
  const [hustlerConfig, setHustlerConfig] = useState(getRandomHustler({}));
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
  
  useEffect(() => {
    if (data?.hustlers.edges?.[0]?.node) {
      const h = data.hustlers.edges[0].node;
      console.log(h);
      setHustlerConfig({ 
        ...hustlerConfig, 
        name: h?.name || '',
        title: h?.title || '',
        sex: (h?.sex.toLowerCase() || 'male') as HustlerSex,
        body: getBodyIndexFromMetadata(h?.body?.id)
      });
      if(h?.svg) setOnChainImage(h?.svg);
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
    if(!itemIds) return;
    return(
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

  return (
    <AppWindow padBody={true} navbar={<Nav />} scrollable>
      <Head title="Hustler Flex" />
        { isLoading && <LoadingBlock /> }
        { !isLoading && itemIds &&          
          <StackedResponsiveContainer>
            <PanelContainer css={css`flex:2 !important;`}>
              <MugshotContainer>
                <HustlerTitle>
                  { hustlerConfig.name }
                  <br/>
                  { getRandomDate('01/01/1980', '01/01/2020') }
                </HustlerTitle>
                <HustlerImage>{ renderHustler(1) }</HustlerImage>
              </MugshotContainer>
            </PanelContainer>
            <PanelContainer css={css`flex:1 !important;`}>
              <PanelBody>
                <Grid templateRows="repeat(2, 1fr)" gap="8" justifyContent="center" 
                alignItems="stretch" width="100%">
                  <GridItem 
                    display="flex" 
                    justifyContent="center"
                    background="#000 url(/images/lunar_new_year_2022/explosion_city-bg.png) center / contain repeat-x"
                  >
                    <HustlerSpriteSheetWalk id={hustlerId?.toString()} />
                  </GridItem>
                  <GridItem 
                    minWidth="256px"
                  >
                    <Image src={onChainImage} alt={hustlerConfig.name} />
                  </GridItem>
                </Grid>
              </PanelBody>
            </PanelContainer>
          </StackedResponsiveContainer>
        }
    </AppWindow>
  );
};

export default Flex;
