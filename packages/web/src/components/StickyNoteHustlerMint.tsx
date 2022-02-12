/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Link } from '@chakra-ui/layout';
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
  const router = useRouter();
  const currentPageIsGangsta = router.pathname == '/gangsta-party';

  return (
    <StickyNote>
      <h3>
        <Link href="/hustlers/initiate" variation="primary">
          <a className="primary">👉 Initiate Your Hustler 👈</a>
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
      {!currentPageIsGangsta && (
        <>
          {hr}
          <span>
            <Link href="/gangsta-party">
              <a className="primary">Gangsta Party</a>
            </Link>
          </span>
        </>
      )}
    </StickyNote>
  );
};

export default StickyNoteHustlerMint;
