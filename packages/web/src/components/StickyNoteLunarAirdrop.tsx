/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Link } from '@chakra-ui/layout';
import StickyNote from './StickyNote';
import { Image } from '@chakra-ui/react';

const StickyNoteHustlerMint = () => {
  const router = useRouter();
  const currentPageIsGangsta = router.pathname == '/gangsta-party';

  return (
    <StickyNote maxWidth="680px" background="#FFB6B6">
      <h3 css={css`margin-bottom:0px !important;`}>
        <Link href="/hustlers/initiate" variation="primary">
          <a>Happy New Year! Claim Your Airdrop…</a>
        </Link>
      </h3>
      <Link href="/lunar-new-year">
        <Image 
          src="/images/lunar_new_year_2022/hongbao_explanation.png" 
          alt="Airdrop Instructions" 
        />
      </Link>
    </StickyNote>
  );
};

export default StickyNoteHustlerMint;
