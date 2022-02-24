/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { Link } from '@chakra-ui/layout';
import { Stack, Box, Button } from '@chakra-ui/react';
import Countdown from 'react-countdown';

const BannerBaronAuction = ({hideBorderBottom = false}: {hideBorderBottom?: boolean}) => {

  return (
    <Stack
      direction={['column', 'column','row']}
      background="#053c6e"
      color="#ffffff"
      width="100%"
      borderBottom={!hideBorderBottom && '2px solid black' || ''}
      alignItems="stretch"
      justifyContent="center"
    >
      <Box
        minWidth={['112px', '188px']}
        minHeight="112px"
        background="#92adcf"
        display="flex"
        flexDirection={['row', 'row', 'column']}
        alignItems={['stretch', 'stretch', 'space-between']}
        justifyContent={['stretch', 'stretch', 'center']}
        css={css`
          image-rendering: pixelated;
        `}
      >
        <Box
          background="url(/images/baron_auction/baron-far.png) center / contain no-repeat"
          flex="1"
        />
        <Box
          background="url(/images/baron_auction/baron-near.png) center / contain no-repeat"
          flex="1"
        />
        <Box
          background="url(/images/baron_auction/baron-mid.png) center / contain no-repeat"
          flex="1"
        />
      </Box>
      <Box flex="2" padding="16px" display="flex" justifyContent="center">
        <Box>
          <Box maxWidth="50em">
            <h3
              css={css`
                margin-bottom: 8px !important;
                padding-bottom: 8px;
                border-bottom: 2px solid rgba(255,255,255,0.2);
                font-size: var(--text-04) !important;
                line-height: 1.25em;
              `}
            >
              Baron Davis &amp; Last Prisoner Project
              Charity Auction
            </h3>
            <Box className="smallest" color="rgba(255,255,255,0.75)">
              Ends in <Countdown date={new Date('03/02/2022 07:00')} />
              {/* Auction begins in <Countdown date={new Date('02/23/2022 17:00:00')} /> */}
            </Box>
            <br />
            <p className="smaller">
              Imagine sitting in a cell for years, decades, or even for life, convicted of an activity that is no longer a crime; while thousands of other people build intergenerational wealth doing exactly the same thing.
            </p>
            <p>
              Over 40,000 cannabis prisoners face this situation today in the United States alone, while countless others languish in jails and prisons worldwide.
            </p>
            <h4
              css={css`
                margin-bottom: 8px !important;
                padding-bottom: 4px;
                border-bottom: 2px solid rgba(255,255,255,0.2);
              `}
            >
              Details
            </h4>
            <p>
              With the help of NBA superstar <a href="https://twitter.com/BaronDavis" className="underline" target="promo">Baron Davis</a> and <a href="https://www.morethanus.io/" target="promo" className="underline">More Than Us</a>, we are helping <a href="https://lastprisonerproject.org" target="promo" className="underline">The Last Prisoner Project</a> by auctioning off a <a href="/swap-meet/hustlers" className="underline" target="promo">Dope Wars Hustler</a> in his likeness.
            </p>
            <p>
              This Hustler contains ✨ ONE OF A KIND ✨ Dope Wars Gear, including a &quot;Lowrider From The Big Easy&quot;, and &quot;Basketball Jersey from the Bayou&quot;.
            </p>
            <p>
              In the spirit of Doing Good, ALL PROCEEDS from the auction will be donated to The Last Prisoner Project. By bidding on the auction you receive a Dope Wars Mugshot, and the Hustler with all gear!
            </p>
          </Box>
          <Stack direction={['column', 'row', 'row']} alignItems="stretch" justifyContent="center">
            <Link href="https://opensea.io/assets/0x2dd79b3e8a8b9e7afe4e1843282383f7704499e4/197" target="bid" passHref flex={1}>
              <Button variant="cny" width="100%">
                Place a Bid
              </Button>
            </Link>
            <Link 
              href="https://www.lastprisonerproject.org/" 
              target="lpp" 
              passHref
              flex={1}
            >
              <Button width="100%" color="black">About Last Prisoner Project</Button>
            </Link>
            <Link 
              href="/about" 
              passHref
              flex={1}
            >
              <Button width="100%" color="black">About Dope Wars</Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default BannerBaronAuction;
