/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { AspectRatio, Link } from '@chakra-ui/layout';
import { Stack, Box, Button, Image } from '@chakra-ui/react';
import Countdown from 'react-countdown';
import { getRandomNumber } from 'utils/utils';

const BannerLunarAirDrop = () => {
  const getDropGif = () => {
    const path = '/images/lunar_new_year_2022';
    const images = [
      'accessories_women_animate.gif',
      'accessories_men_animate.gif',
      'mask-roulette_4.gif',
    ];
    return `${path}/${images[getRandomNumber(0, images.length - 1)]}`;
  };

  return (
    <Stack
      direction="row"
      background="#FFB6B6"
      width="100%"
      borderBottom="2px solid black"
      alignItems="stretch"
      justifyContent="center"
    >
      <Box
        minWidth={['96px', '188px']}
        background="#FF6464"
        alignItems="center"
        justifyContent="stretch"
      >
        <Link href="/lunar-new-year" height="100%">
          <AspectRatio ratio={1} display={['block', 'none']}>
            <Image
              src="/images/lunar_new_year_2022/hongbao_animated.gif"
              alt="Airdrop Instructions"
              css={css`
                image-rendering: pixelated;
              `}
            />
          </AspectRatio>
          <AspectRatio ratio={1}>
            <Image
              src={getDropGif()}
              alt="Airdrop Instructions"
              css={css`
                image-rendering: pixelated;
              `}
            />
          </AspectRatio>
          <AspectRatio ratio={1} display={['block', 'none']}>
            <Image
              src="/images/lunar_new_year_2022/hongbao_animated.gif"
              alt="Airdrop Instructions"
              css={css`
                image-rendering: pixelated;
              `}
            />
          </AspectRatio>
        </Link>
      </Box>
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
        <Stack direction={['column', 'row', 'row']} alignItems="center">
          <Link href="/lunar-new-year" width={['100%', 'auto']} passHref>
            <Button variant="cny">Claim Your Airdrop</Button>
          </Link>
          <Link href="/lunar-new-year?section=mask" width={['100%', 'auto']} passHref>
            <Button variant="cny">Buy a Rare Mask</Button>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default BannerLunarAirDrop;
