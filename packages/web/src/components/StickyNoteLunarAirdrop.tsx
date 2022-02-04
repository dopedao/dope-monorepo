/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Link } from '@chakra-ui/layout';
import StickyNote from './StickyNote';
import { Button, Image } from '@chakra-ui/react';

const StickyNoteHustlerMint = () => {
  const router = useRouter();
  const currentPageIsGangsta = router.pathname == '/gangsta-party';

  return (
    <StickyNote background="#FFB6B6" canClose>
      <h3 css={css`margin-bottom:0px !important;`}>
        Lunar New Year Airdrop
      </h3>
      <Link href="/lunar-new-year">
        <Image 
          src="/images/lunar_new_year_2022/hongbao_explanation.png" 
          alt="Airdrop Instructions" 
          width="100%"
        />
      </Link>
      <Link href="/lunar-new-year" passHref>
        <Button variant="cny">Claim Your Airdrop</Button>
      </Link>
      <Link href="/lunar-new-year?section=mask" passHref>
        <Button variant="cny" css={css`margin-top:8px`}>Buy a Rare Mask</Button>
      </Link>
    </StickyNote>
  );
};

export default StickyNoteHustlerMint;
