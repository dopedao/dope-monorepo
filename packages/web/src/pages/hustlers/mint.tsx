import { Box, Button, Image, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { DEFAULT_BG_COLORS } from 'utils/HustlerConfig';
import { getRandomArrayElement, getRandomNumber } from 'utils/utils';
import AppWindow from 'components/AppWindow';
import DopeCard from 'features/dope/components/DopeCard';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import LoadingBlock from 'components/LoadingBlock';
import RenderFromDopeIdOnly from 'features/hustlers/components/RenderFromDopeIdOnly';
import { useState, useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import { OrderDirection, useDopesQuery, DopeOrderField } from 'generated/graphql';
import Link from 'next/link';
import BuyDopeButton from 'features/dope/components/BuyDopeButton';

import useQueryParam from 'hooks/useQueryParam';

import { AskPrice } from 'features/swap-meet/components';
import ArrowBack from 'ui/svg/ArrowBack';
import ArrowForward from 'ui/svg/ArrowForward';
import { REFETCH_INTERVAL } from 'utils/constants';

const getRandomBgColor = () => {
  // Remove first item which is dark grey color
  // So we have a predictable canvas color to design on.
  return getRandomArrayElement(DEFAULT_BG_COLORS.slice(1, DEFAULT_BG_COLORS.length));
};

const QuickBuyHustler = () => {
  const {
    data: unclaimedDope,
    status: searchStatus,
    isLoading,
  } = useDopesQuery(
    {
      first: 50,
      orderBy: {
        field: DopeOrderField.BestAskPrice,
        direction: OrderDirection.Asc,
      },
      // unopened for sale items
      where: {
        opened: false,
        bestAskPriceEthGT: 0,
      },
    },
    {
      queryKey: ['quick-buy-dopes'],
      refetchInterval: REFETCH_INTERVAL,
    },
  );
  const [bgColor, setBgColor] = useState(getRandomBgColor());
  const [currentDopeIndex, setCurrentDopeIndex] = useState(0);
  const [showHustler, setShowHustler] = useState(true);
  const [purchaseIsComplete, setPurchaseIsComplete] = useState(false);

  useEffect(() => {
    setBgColor(getRandomBgColor());
  }, []);

  const unclaimedDopeArr = useMemo(() => {
    if (unclaimedDope?.dopes.edges) {
      const dopes = unclaimedDope.dopes.edges.map(e => e?.node);
      setCurrentDopeIndex(getRandomNumber(0, dopes.length - 1));
      return dopes;
    }
    return [];
  }, [unclaimedDope]);

  const currentDope = useMemo(
    () => unclaimedDopeArr?.[currentDopeIndex],
    [unclaimedDopeArr, currentDopeIndex],
  );

  // for setting the current dope from the query param
  const [dopeId, setDopeId] = useQueryParam('dope_id', '');
  useEffect(() => {
    if (dopeId) {
      const index = unclaimedDopeArr.findIndex(dope => dope?.id === dopeId);
      if (index > -1) {
        setCurrentDopeIndex(index);
      }
    }
  }, [dopeId, unclaimedDopeArr]);

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

  const CarouselButtons = () => (
    <Box display="flex" justifyContent="space-between" gap="8px" width="100%">
      <Button flex="1" gap=".5em" onClick={decrementIndex} isDisabled={currentDopeIndex <= 0}>
        {/* <Image src="/images/icon/arrow-back.svg" alt="Previous" width="16px" marginRight="8px;" /> */}
        <ArrowBack size={16} />
        <Box>Prev</Box>
      </Button>
      <Button flex="2" onClick={() => setShowHustler(!showHustler)}>
        {showHustler ? 'Show Gear' : 'Show Hustler'}
      </Button>
      <Button
        flex="1"
        gap=".5em"
        onClick={incrementIndex}
        isDisabled={currentDopeIndex >= unclaimedDopeArr.length - 1}
      >
        <Box>Next</Box>
        <ArrowForward size={16} />
      </Button>
    </Box>
  );

  return (
    <AppWindow title="Welcome to the Streets" fullScreen background={bgColor}>
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
              <Box width="100%" height="100%" position="relative" minHeight="350px">
                <Box
                  css={css`
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    top: 0;
                    right: 0;
                    opacity: ${showHustler ? '1' : '0'};
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <RenderFromDopeIdOnly id={currentDope.id} />
                </Box>

                {!showHustler && (
                  <Box
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
                  </Box>
                )}
              </Box>
              {!purchaseIsComplete && <CarouselButtons />}
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" gap="16px">
              <Box flex="1" />
              <Box padding="8px" flex="2">
                <h2>Get Hooked On DOPE</h2>
                <hr className="onColor" />
                <p>
                  <Link
                    href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d491a70fab074062b7b3248d6d09c06a"
                    target="wiki"
                    className="underline"
                    passHref
                  >
                    Hustlers are the in-game characters of Dope Wars.
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
                    <Tbody>
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
                            {/* <dt>
                              10,000 $PAPER
                              <Image
                                src="/images/icon/ethereum.svg"
                                width="16px"
                                alt="This asset lives on Ethereum Mainnet"
                              />
                            </dt> */}
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
                        <Td borderBottom="0 !important">
                          <AskPrice price={currentDope?.bestAskPriceEth} color="black" />
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </Box>
              <Box flex="1" />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                gap="8px"
                css={{
                  button: {
                    width: '100%',
                  },
                }}
              >
                {!purchaseIsComplete && (
                  <>
                    <Box opacity="0.8" fontSize="small">
                      This is a 2-step process. You will be prompted to mint a Hustler after
                      purchasing the DOPE NFT here.
                    </Box>
                    <BuyDopeButton
                      dope={currentDope}
                      allowContinueOnClaimed={false}
                      alertMsg="This DOPE's gear has been claimed and may no longer be used to mint a Hustler. Please select another one."
                      // necessary to show the purchase complete element
                      purchaseCompleteCallback={() => setPurchaseIsComplete(true)}
                    />
                  </>
                )}
                {purchaseIsComplete && (
                  <>
                    <Box opacity="0.8" fontSize="small">
                      Congratulations your purchase is complete!
                      <br />
                      Please move onto the next step. 🎉🎉🎉
                    </Box>
                    <Link href={`/hustlers/${currentDope.id}/initiate`} passHref>
                      <Button
                        variant="primary"
                        bgColor="var(--new-year-red)"
                        isDisabled={currentDope.opened}
                      >
                        Configure Your New Hustler
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
            </Box>
          </>
        )}
      </StackedResponsiveContainer>
    </AppWindow>
  );
};

export default QuickBuyHustler;
