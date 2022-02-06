/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { Link } from '@chakra-ui/layout';
import { Stack, Box, Button, Image } from '@chakra-ui/react';
import Countdown from 'react-countdown';
import { getRandomNumber } from 'utils/utils';

const BannerLunarAirDrop = () => {
  const gifName = (() => {
    const path = '/images/lunar_new_year_2022';
    const images = [
      'accessories_women_animate.gif',
      'accessories_men_animate.gif',
      'hongbao_animated.gif',
      'mask-roulette_4.gif'
    ];
    return `${path}/${images[getRandomNumber(0,images.length-1)]}`;
  })();

  return (
    <Stack
      direction="row"
      background="#FFB6B6"
      width="100%"
      borderBottom="2px solid black"
      alignItems="center"
    >
      <Link href="/lunar-new-year" flex="1">
        <Image
          src={gifName}
          alt="Airdrop Instructions"
          width="100%"
          css={css`
            image-rendering: pixelated;
          `}
        />
      </Link>
      <Box flex="2" padding="16px">
        <h3
          css={css`
            margin-bottom: 0px !important;
          `}
        >
          DONT MISS THE LUNAR AIRDROP
        </h3>
        <div className="smallest">
          Ends in <Countdown date={new Date('02/15/2022')} />
        </div>
        <br />
        <p className="smaller">
          Until Feb 15th we&apos;re celebrating the Lunar New Year with a free accessory drop from
          Chinatown. Feeling Lucky? Spin the wheel for a chance at a rare Zodiac Mask…
        </p>
        <Stack direction="row" alignItems="center">
          <Link href="/lunar-new-year" passHref>
            <Button variant="cny">Claim Your Airdrop</Button>
          </Link>
          <Link href="/lunar-new-year?section=mask" passHref>
            <Button variant="cny">Buy a Rare Mask</Button>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default BannerLunarAirDrop;
