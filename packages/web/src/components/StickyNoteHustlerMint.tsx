/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { Link } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import StickyNote from './StickyNote';

const hr = (
  <hr
    css={css`
      margin: 1em 0;
      border-color: rgba(0, 0, 0, 0.125);
    `}
  />
);

const StickyNoteHustlerMint = () => {
  return (
    <StickyNote>
      <h3>
        <Link href="/hustlers/mint" className="primary">
          <Button className="primary">🎉 Mint a Hustler 🎉</Button>
        </Link>
      </h3>
      {hr}
      <span>
        <a
          href="https://dope-wars.notion.site/Hustler-Guide-ad81eb1129c2405f8168177ba99774cf"
          target="hustler-minting-faq"
          className="primary"
        >
          Hustler FAQ
        </a>
      </span>
    </StickyNote>
  );
};

export default StickyNoteHustlerMint;
