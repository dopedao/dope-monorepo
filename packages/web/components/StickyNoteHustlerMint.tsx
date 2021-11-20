import { useReleaseDate } from "hooks/contracts";
import Countdown from "react-countdown";
import { Link } from "@chakra-ui/layout";
import StickyNote from "./StickyNote";

const StickyNoteHustlerMint = () => {
  const releaseDate = useReleaseDate();

  return (
    <StickyNote maxWidth="312px">
      <h4>
        <Link href="/hustlers/initiate" variation="primary">
          <a className="primary">
            👉 Mint your OG Hustler here 👈
          </a>
        </Link>
      </h4>
      ( <Countdown date={releaseDate ?? Date.now()} /> )
    </StickyNote>
  );
};

export default StickyNoteHustlerMint;
