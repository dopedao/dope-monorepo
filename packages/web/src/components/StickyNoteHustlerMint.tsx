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
    <StickyNote maxWidth="312px">
      <h3>
        <Link href="/dope" variation="primary">
          <a className="primary">👉 Mint Your Hustler Here 👈</a>
        </Link>
      </h3>
      {hr}
      <span>
        <a
          href="https://dope-wars.notion.site/Hustler-Minting-and-Unbundling-25c6dfb9dca64196aedf8def6297c51a"
          target="hustler-minting-faq"
          className="primary"
        >
          Minting FAQ
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
