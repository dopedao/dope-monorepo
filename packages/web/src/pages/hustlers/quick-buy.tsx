import { Box, Button, Image, Table, Tr, Td } from "@chakra-ui/react";
import { DEFAULT_BG_COLORS } from "utils/HustlerConfig";
import { getRandomArrayElement } from "utils/utils";
import { ethers } from "ethers";
import AppWindow from "components/AppWindow";
import DopeCard from "features/dope/components/DopeCard";
import StackedResponsiveContainer from "components/StackedResponsiveContainer";
import LoadingBlock from "components/LoadingBlock";
import RenderFromDopeIdOnly from "components/hustler/RenderFromDopeIdOnly";
import {useState, useEffect} from 'react';
import { css } from "@emotion/react";
import { 
  useSearchDopeQuery, 
  OrderDirection,
  SearchOrderField,
  SearchType
} from 'generated/graphql';
import { consoleSandbox } from "@sentry/utils";

const getRandomBgColor = () => {
  // Remove first item which is dark grey color
  // So we have a predictable canvas color to design on.
  return getRandomArrayElement(
    DEFAULT_BG_COLORS.slice(1,DEFAULT_BG_COLORS.length)
  );
}

const QuickBuyHustler = () => {
  const {
    data: unclaimedDope,
    status: searchStatus,
  } = useSearchDopeQuery(
    {
      query: '',
      first: 25,
      orderBy: {
        field: SearchOrderField.SalePrice,
        direction: OrderDirection.Asc,
      },
      where: {
        type: SearchType.Dope,
        opened: false,
        saleActive: true
      },
    }
  );
  const isLoading = searchStatus === 'loading';
  const [bgColor, setBgColor] = useState(getRandomBgColor());
  const [unclaimedDopeArr, setUnclaimedDopeArr] = useState<any>([]);
  const [currentDopeIndex, setCurrentDopeIndex] = useState(0);
  const [currentDope, setCurrentDope] = useState<any>();
  const [showHustler, setShowHustler] = useState(true);
  
  const decrementIndex = () => {
    let index = currentDopeIndex;
    index--;
    if (0 > index) index = 0;
    setCurrentDopeIndex(index);
  };

  const incrementIndex = () => {
    let index = currentDopeIndex;
    const maxIndex = unclaimedDopeArr.length - 1;
    index++;
    if (index > maxIndex) index = maxIndex;
    setCurrentDopeIndex(index);
  };

  const getCurrentPrice = () => {
    const activeListings = currentDope.listings?.filter((l:any) => l?.active);
    const price = activeListings?.[0]?.inputs?.[0]?.amount;
    return `${ethers.utils.formatEther(price || 0)} Ξ`
  }

  useEffect(() => {
    if(unclaimedDope?.search?.edges) {
      // Have to filter array for things that have "node" property
      // which are the DOPE objects we want
      setUnclaimedDopeArr(
        unclaimedDope.search.edges?.map((dope: any) => {
          if (dope && dope.node) return dope.node
        })
      );
    }
  }, [unclaimedDope, isLoading]);

  useEffect(() => {
    setBgColor(getRandomBgColor());
    setCurrentDope(unclaimedDopeArr[currentDopeIndex]);
  }, [currentDopeIndex, unclaimedDopeArr])

  const CarouselButtons = () => (
    <Box
      display="flex"
      justifyContent="stretch"
      gap="8px"
      >
      <Button 
        flex="1"
        onClick={decrementIndex}
        disabled={currentDopeIndex <= 0}
      >
        <Image 
          src="/images/icon/arrow-back.svg" 
          alt="Previous" 
          width="16px"
          marginRight="8px;"
        />
        Previous
      </Button>
      <Button 
        flex="1"
        onClick={incrementIndex} 
        disabled={currentDopeIndex >= unclaimedDopeArr.length-1}
      >
        Next
        <Image 
          src="/images/icon/arrow-forward.svg" 
          alt="Next" 
          width="16px" 
          marginLeft="8px;"
        />
      </Button>
    </Box>
  );

  const QuickBuyFooter = () => (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      gap="8px"
      >
      <CarouselButtons />
      <Button onClick={() => setShowHustler(!showHustler) }>
        {showHustler ? 'Show Equipment' : 'Show Hustler' }
      </Button>
      <Button variant="primary">
        Customize
      </Button>
    </Box>
  );

  return(
    <AppWindow 
      title="Quick Buy Hustler" 
      height={740}
      background={bgColor}
    >
      <StackedResponsiveContainer>
        {(isLoading || !currentDope) && <LoadingBlock maxRows={5} /> }
        {!isLoading && currentDope && <>
          <Box 
            flex="3 !important"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="8px"
          >
            {showHustler && 
              <RenderFromDopeIdOnly id={currentDope.id} /> 
            }
            {!showHustler &&
              <DopeCard
                key={currentDope.id}
                dope={currentDope}
                isExpanded={true}
                showPreviewButton={false}
                buttonBar={null}
                showCollapse
              />
            }
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="16px"
          >
            <Box padding="8px">
              <h2>Get a Hustler Now</h2>
              <hr className="onColor" />
              <p>
                Hustlers are the NFT in-game characters of Dope Wars, who can own up to 10 different pieces of NFT Gear.
              </p>
              <p>
                Swoop a fully equipped DOPE NFT and Hustler right now using our streamlined process.
              </p>
              <Box>
                <Table css={css`
                  * {
                    border-top: 2px solid rgba(0,0,0,0.15) !important;
                    border-bottom: 2px solid rgba(0,0,0,0.15) !important;
                  }
                `}>
                  <Tr>
                    <Td>You&nbsp;receive</Td>
                    <Td>10 NFTs</Td>
                  </Tr>
                  <Tr>
                    <Td>Estimated&nbsp;Total</Td>
                    <Td>
                      {getCurrentPrice()}
                    </Td>
                  </Tr>
                </Table>
              </Box>
            </Box>
            <QuickBuyFooter />
          </Box>
        </>}
      </StackedResponsiveContainer>
    </AppWindow>
  )
}

export default QuickBuyHustler;
