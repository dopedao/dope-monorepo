import { Box, Button, Image, Table, Tr, Td } from '@chakra-ui/react';
import { DEFAULT_BG_COLORS } from 'utils/HustlerConfig';
import { getRandomArrayElement } from 'utils/utils';
import { BigNumber, ethers } from 'ethers';
import AppWindow from 'components/AppWindow';
import DopeCard from 'features/dope/components/DopeCard';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import LoadingBlock from 'components/LoadingBlock';
import RenderFromDopeIdOnly from 'components/hustler/RenderFromDopeIdOnly';
import { useState, useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import {
  useSearchDopeQuery,
  OrderDirection,
  SearchOrderField,
  SearchType,
} from 'generated/graphql';
import { useOneClickInitiator } from 'hooks/contracts';

const getRandomBgColor = () => {
  // Remove first item which is dark grey color
  // So we have a predictable canvas color to design on.
  return getRandomArrayElement(DEFAULT_BG_COLORS.slice(1, DEFAULT_BG_COLORS.length));
};

const QuickBuyHustler = () => {
  const { data: unclaimedDope, status: searchStatus } = useSearchDopeQuery({
    query: '',
    first: 25,
    orderBy: {
      field: SearchOrderField.SalePrice,
      direction: OrderDirection.Asc,
    },
    where: {
      type: SearchType.Dope,
      opened: false,
      saleActive: true,
    },
  });
  const isLoading = searchStatus === 'loading';
  const [bgColor, setBgColor] = useState(getRandomBgColor());
  const [currentDopeIndex, setCurrentDopeIndex] = useState(0);
  const [showHustler, setShowHustler] = useState(true);
  const [paperPrice, setPaperPrice] = useState<BigNumber>();
  const oneclick = useOneClickInitiator();

  useEffect(() => {
    setBgColor(getRandomBgColor());
  }, []);

  const unclaimedDopeArr = useMemo(() => {
    if (unclaimedDope?.search?.edges) {
      // Have to filter array for things that have "node" property
      // which are the DOPE objects we want
      return unclaimedDope.search.edges?.map(dope => {
        if (dope && dope.node) return dope.node;
      });
    }
    return [];
  }, [unclaimedDope]);

  const currentDope = useMemo(
    () => unclaimedDopeArr[currentDopeIndex],
    [unclaimedDopeArr, currentDopeIndex],
  );

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

  useEffect(() => {
    if (oneclick) {
      oneclick.callStatic.estimate(ethers.utils.parseUnits('12500', 18)).then(setPaperPrice);
    }
  }, [oneclick]);

  const currentPrice = useMemo(() => {
    const activeListings = currentDope?.listings?.filter((l: any) => l?.active);
    const price = BigNumber.from(activeListings?.[0]?.inputs?.[0]?.amount);
    return `${(+ethers.utils.formatEther(price && paperPrice ? price.add(paperPrice) : 0)).toFixed(
      4,
    )} Ξ`;
  }, [currentDope?.listings, paperPrice]);

  const CarouselButtons = () => (
    <Box display="flex" justifyContent="stretch" gap="8px">
      <Button flex="1" onClick={decrementIndex} disabled={currentDopeIndex <= 0}>
        <Image src="/images/icon/arrow-back.svg" alt="Previous" width="16px" marginRight="8px;" />
        Previous
      </Button>
      <Button
        flex="1"
        onClick={incrementIndex}
        disabled={currentDopeIndex >= unclaimedDopeArr.length - 1}
      >
        Next
        <Image src="/images/icon/arrow-forward.svg" alt="Next" width="16px" marginLeft="8px;" />
      </Button>
    </Box>
  );

  const QuickBuyFooter = () => (
    <Box display="flex" flexDirection="column" justifyContent="flex-start" gap="8px">
      <Button variant="primary">Customize</Button>
      <CarouselButtons />
      <Button onClick={() => setShowHustler(!showHustler)}>
        {showHustler ? 'Show Equipment' : 'Show Hustler'}
      </Button>
    </Box>
  );

  return (
    <AppWindow title="Quick Buy Hustler" height={740} background={bgColor}>
      <StackedResponsiveContainer>
        {(isLoading || !currentDope) && <LoadingBlock maxRows={5} />}
        {!isLoading && currentDope && (
          <>
            <Box
              flex="3 !important"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="8px"
            >
              <Box width="100%" height="100%">
                {showHustler && <RenderFromDopeIdOnly id={currentDope.id} />}
                {!showHustler && (
                  <DopeCard
                    key={currentDope.id}
                    dope={currentDope}
                    isExpanded={true}
                    showPreviewButton={false}
                    buttonBar={null}
                    showCollapse
                  />
                )}
              </Box>
              <div className="smallest">
                <a
                  href="/swap-meet"
                  css={css`
                    border-bottom: 1px solid black;
                  `}
                >
                  See more DOPE on our Swap Meet
                </a>
              </div>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" gap="16px">
              <Box padding="8px">
                <h2>Get a Hustler Now</h2>
                <hr className="onColor" />
                <p>
                  Hustlers are the in-game characters of Dope Wars who can own up to 10 different
                  pieces of NFT Gear.
                </p>
                <p>
                  DOPE Gear comes directly from our DOPE NFT tokens that live on Ethereum by
                  claiming it.
                </p>
                <p>
                  Get a fully-equipped Dope Wars character kit and DAO voting token using this
                  streamlined process right now.
                </p>
                <Box>
                  <Table
                    css={css`
                      td {
                        padding: 16px 0;
                        border-top: 2px solid rgba(0, 0, 0, 0.15) !important;
                        border-bottom: 2px solid rgba(0, 0, 0, 0.15) !important;
                        vertical-align: top;
                      }
                      dl {
                        width: 100%;
                        dt {
                          width: 100%;
                          display: flex;
                          justify-content: space-between;
                          gap: 4px;
                          margin-bottom: 0.5em;
                          img {
                            opacity: 0.5;
                          }
                        }
                      }
                    `}
                  >
                    <Tr>
                      <Td className="noWrap">NFTs you receive</Td>
                      <Td>
                        <dl>
                          <dt>
                            DOPE #{currentDope.id}
                            <Image
                              src="/images/icon/ethereum.svg"
                              width="16px"
                              alt="This asset lives on Ethereum Mainnet"
                            />
                          </dt>
                          <dt>
                            1 Hustler
                            <Image
                              src="/images/icon/optimism.svg"
                              width="16px"
                              alt="This asset lives on Optimism"
                            />
                          </dt>
                          <dt>
                            9 Gear
                            <Image
                              src="/images/icon/optimism.svg"
                              width="16px"
                              alt="This asset lives on Optimism"
                            />
                          </dt>
                        </dl>
                      </Td>
                    </Tr>
                    <Tr className="noWrap">
                      <Td>Estimated Total</Td>
                      <Td>{currentPrice}</Td>
                    </Tr>
                  </Table>
                </Box>
              </Box>
              <QuickBuyFooter />
            </Box>
          </>
        )}
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default QuickBuyHustler;
