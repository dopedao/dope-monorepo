/* eslint-disable @next/next/no-img-element */
import { BigNumber } from 'ethers';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getRandomHustler } from 'utils/HustlerConfig';
import { Stack, Button, Grid, GridItem } from '@chakra-ui/react';
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

const Nav = () => (
  <AppWindowNavBar>
    <Link href="/inventory?section=Hustlers" passHref>
      <Button variant="navBar">
        Your Hustlers
      </Button>
    </Link>
    <Link href="/gangsta-party" passHref>
      <Button variant="navBar">
        Gangsta Party
      </Button>
    </Link>
  </AppWindowNavBar>
);

const HustlerTitle = styled.h1`
  font-family: Dope !important;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
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
  top:-2em;
  left:0px;
  bottom:0px;
  right:0px;
`
const MugshotContainer = styled.div`
  position: relative;
  height: 100%;
  background: #f2f2f2 url(/images/hustler/mugshot_bg.png) center center / contain no-repeat;
`

const Flex = () => {

  const router = useRouter();
  const {id: hustlerId} = router.query;
  const [itemIds, setItemIds] = useState<BigNumber[]>();
  const [hustlerConfig, setHustlerConfig] = useState(getRandomHustler({}));
  const [bgColor, setBgColor] = useState('transparent');

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
      setBgColor(h?.background ? '#'+h.background.substring(0,h.background.length-2) : 'transparent');
      setHustlerConfig({ 
        ...hustlerConfig, 
        name: h?.name || '',
        title: h?.title || ''
      });
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
          <Stack direction="column" width="100%" minHeight="100%" padding="32px" gap="16px">
            <Stack width="100%" direction="row" height="25%" gap="16px">
              <PanelContainer css={css`flex:2;`}>
                <MugshotContainer>
                  <HustlerTitle>{ hustlerConfig.name }</HustlerTitle>
                  <HustlerImage>{ renderHustler(1) }</HustlerImage>
                </MugshotContainer>
              </PanelContainer>
              <PanelContainer css={css`flex:1;`}>
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
                    <GridItem minWidth="256px">{ renderHustler(0) }</GridItem>
                  </Grid>
                </PanelBody>
              </PanelContainer>
            </Stack>
            <Stack width="100%">
              <PanelContainer>
                <PanelBody>
                  { renderHustler(3) }
                </PanelBody>
              </PanelContainer>
            </Stack>
          </Stack>
        }
    </AppWindow>
  );
};

export default Flex;
