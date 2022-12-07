import { Box, Button, Image, Table, Tr, Td } from '@chakra-ui/react';
import { DEFAULT_BG_COLORS } from 'utils/HustlerConfig';
import { getRandomArrayElement, getRandomNumber } from 'utils/utils';
import { BigNumber, ethers } from 'ethers';
import AppWindow from 'components/AppWindow';
import DopeCard from 'features/dope/components/DopeCard';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import LoadingBlock from 'components/LoadingBlock';
import RenderFromDopeIdOnly from 'components/hustler/RenderFromDopeIdOnly';
import { useState, useEffect, useMemo, useRef } from 'react';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import {
  useSearchDopeQuery,
  OrderDirection,
  SearchOrderField,
  SearchType,
  SearchDopeQuery,
} from 'generated/graphql';
import { useOneClickInitiator } from 'hooks/contracts';
import Link from 'next/link';

const getRandomBgColor = () => {
  // Remove first item which is dark grey color
  // So we have a predictable canvas color to design on.
  return getRandomArrayElement(DEFAULT_BG_COLORS.slice(1, DEFAULT_BG_COLORS.length));
};

const QuickBuyHustler = () => {
  const { data: unclaimedDope, status: searchStatus } = useSearchDopeQuery({
    query: '',
    first: 50,
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
      const dopes = unclaimedDope.search.edges?.reduce((prev, dope) => {
        if (dope && dope.node && dope.node.__typename === 'Dope') {
          return [...prev, dope.node];
        }
        return prev;
      }, [] as any);

      setCurrentDopeIndex(getRandomNumber(0, dopes.length - 1));
      return dopes;
    }
    return [];
  }, [setCurrentDopeIndex, unclaimedDope]);

  const currentDope = useMemo(
    () => unclaimedDopeArr && unclaimedDopeArr[currentDopeIndex],
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
      oneclick.callStatic.estimate(ethers.utils.parseUnits('22500', 18)).then(setPaperPrice);
    }
  }, [oneclick]);

  const currentPrice = useMemo(() => {
    const activeListings = currentDope?.listings?.filter((l: any) => l?.active);
    const listingPrice = activeListings?.[0]?.inputs?.[0]?.amount;
    return `${(+ethers.utils.formatEther(
      listingPrice && paperPrice ? BigNumber.from(listingPrice).add(paperPrice) : 0,
    )).toFixed(4)}`;
  }, [currentDope, paperPrice]);

  const CarouselButtons = () => (
    <Box display="flex" justifyContent="space-between" gap="8px" width="100%">
      <Button flex="1" onClick={decrementIndex} disabled={currentDopeIndex <= 0}>
        <Image src="/images/icon/arrow-back.svg" alt="Previous" width="16px" marginRight="8px;" />
        Prev
      </Button>
      <Button flex="2" onClick={() => setShowHustler(!showHustler)}>
        {showHustler ? 'Show Gear' : 'Show Hustler'}
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
      <Link href={`/hustlers/${currentDope.id}/initiate?quickBuy`} passHref>
        <Button
          // autoFocus
          variant="primary"
        >
          Customize
        </Button>
      </Link>
    </Box>
  );

  return (
    <AppWindow title="Welcome To The Streets" fullScreen background={bgColor}>
      <StackedResponsiveContainer
        css={css`
          padding: 16px !important;
          ${media.tablet`
          padding: 64px !important;
        `}
        `}
      >
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
              {/* <div className="smallest">
                <a
                  href="/swap-meet"
                  css={css`
                    border-bottom: 1px solid black;
                  `}
                >
                  See more DOPE on our Swap Meet
                </a>
              </div> */}
              <Box width="100%" height="100%" position="relative" minHeight="350px">
                <div
                  css={css`
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    top: 0;
                    right: 0;
                    opacity: ${showHustler ? '1' : '0'};
                  `}
                >
                  <RenderFromDopeIdOnly id={currentDope.id} />
                </div>

                {!showHustler && (
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      height: 100%;
                    `}
                  >
                    <DopeCard
                      key={currentDope.id}
                      dope={currentDope}
                      isExpanded={true}
                      buttonBar={null}
                      showCollapse
                      hidePreviewButton
                    />
                  </div>
                )}
              </Box>
              <CarouselButtons />
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" gap="16px">
              <Box flex="1"></Box>
              <Box padding="8px" flex="2">
                <h2>Get Hooked On DOPE</h2>
                <hr className="onColor" />
                <p>
                  <Link
                    href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d491a70fab074062b7b3248d6d09c06a"
                    passHref
                  >
                    <a target="wiki" className="underline">
                      Hustlers
                    </a>{' '}
                    are the in-game characters of Dope Wars.
                  </Link>
                </p>
                <p>
                  Hustlers can own up to 10 different pieces of interchangeable NFT Gear, which will
                  be useful in a series of games currently under development.
                </p>
                <p>
                  Dope Gear comes directly from unclaimed floor-priced Dope NFT tokens, which sold
                  out in September 2021.
                </p>
                <p>Get a fully equipped Dope Wars setup now.</p>
                <Box>
                  <Table
                    css={css`
                      td {
                        padding: 16px 0;
                        border-top: 2px solid rgba(0, 0, 0, 0.15);
                        border-bottom: 2px solid rgba(0, 0, 0, 0.15);
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
                      <Td className="noWrap">You receive</Td>
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
                            10,000 $PAPER
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
                      <Td borderBottom="0 !important">Estimated Total</Td>
                      <Td borderBottom="0 !important">{currentPrice} Ξ</Td>
                    </Tr>
                  </Table>
                </Box>
              </Box>
              <Box flex="1"></Box>
              <QuickBuyFooter />
            </Box>
          </>
        )}
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default QuickBuyHustler;
