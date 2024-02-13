import { AlertIcon, Alert } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import Link from 'next/link';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import styled from '@emotion/styled';

const VerticalPanelStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px; // Phone, make sure there's a gap between modules
  height: 100%;
  & > * {
    flex: 0 0 auto;
    height: auto;
  }
  // Screen > Tablet display items side by side
  ${media.tablet`
    & > * {
      flex: 1;
      height: 40%;
    } 
  `}
`;

const InitiationInfo = () => {
  return (
    <VerticalPanelStack>
      <PanelContainer>
        <PanelTitleBar>
          <Box>Info</Box>
        </PanelTitleBar>
        <PanelBody>
          <h3>Initiation</h3>
          <p>
            Hustlers are the in-game representation of characters inside DOPE WARS. Each Hustler
            gains RESPECT based on the amount of time passed since their Initiation. RESPECT will be
            useful in the upcoming DOPE WARS game, and provide your Hustler with certain advantages.
          </p>
          <p>
            A Hustler’s appearance is customizable, based on the items in their inventory and
            attributes you select. All Hustler artwork is stored on the Ethereum blockchain, with a
            next-level technical approach that few projects can match.
          </p>

          <h3>Claiming Gear</h3>
          <p>
            Initiating a Hustler will Claim Gear and create 9 new Item NFTs from one DOPE NFT, and
            equip them on your Hustler. Because each of these new items become their own separate
            NFT, they’re also tradeable on the secondary market.
          </p>
          <p>
            Soon™ you’ll be able to upgrade your Hustler by mixing-and-matching items from multiple
            DOPE NFT bundles – with over ONE BILLION possible combinations.
          </p>
          <p>
            Gear from each DOPE NFT can only be claimed once. The DOPE NFT remains in your wallet
            and still serves as the governance token for DopeWars DAO. Expect each DOPE NFT to have
            more utility developed for it in the future.
          </p>
          <h3>More Info</h3>
          <ul className="normal">
            <li>
              <Link
                href="https://dope-wars.notion.site/Hustler-Minting-and-Unbundling-25c6dfb9dca64196aedf8def6297c51a"
                className="primary"
              >
                The Dope Wars Hustler Guide
              </Link>
            </li>
            <li>
              <Link href="/swap-meet/inventory" className="primary">
                Gangsta Party
              </Link>
            </li>
          </ul>
        </PanelBody>
        <Box></Box>
      </PanelContainer>
      <Alert
        status="info"
        css={css`
          max-height: 100px;
          border: 2px solid black;
        `}
      >
        <AlertIcon />
        <Box>
          All OGs have been Initiated, but Hustlers are an infinite mint! Make as many as you want.
        </Box>
      </Alert>
    </VerticalPanelStack>
  );
};
export default InitiationInfo;
