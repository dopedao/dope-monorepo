import { Link } from "@chakra-ui/layout";
import StickyNote from "./StickyNote";
import { css } from "@emotion/react";

const StickyNoteHustlerMint = () => {
  return (
    <StickyNote maxWidth="312px">
      <h3>
        <Link href="/hustlers/initiate" variation="primary">
          <a className="primary">
            👉 Mint OG Hustler Here 👈
          </a>
        </Link>
      </h3>
      <hr css={css`margin: 1em 0; border-color: black;`} />
      <span>
        <a href="https://dope-wars.notion.site/Hustler-Minting-and-Unbundling-25c6dfb9dca64196aedf8def6297c51a" target="hustler-minting-faq" className="primary">
        Minting FAQ
        </a>
      </span>
    </StickyNote>
  );
};

export default StickyNoteHustlerMint;
