import { AlertIcon, Alert } from '@chakra-ui/react';
import { media } from 'styles/mixins';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import Link from 'next/link';

const VerticalPanelStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
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
          <div>Info</div>
        </PanelTitleBar>
        <PanelBody
          css={css`
            height: 100%;
          `}
        >
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

          <h3>Unbundling</h3>
          <p>
            Initiating a hustler will Unbundle and create 9 new Item NFTs from one DOPE NFT, and
            equip them on your Hustler. Because each of these new items become their own separate
            NFT, they’re also tradeable on the secondary market.
          </p>
          <p>
            Soon™ you’ll be able to upgrade your Hustler by mixing-and-matching items from multiple
            DOPE NFT bundles – with over ONE BILLION possible combinations.
          </p>
          <p>
            Each DOPE NFT can only be unbundled once. The DOPE NFT remains in your wallet and still
            serves as the governance token for DopeWars DAO. Expect each DOPE NFT to have more
            utility developed for it in the future.
          </p>
          <h3>More Info</h3>
          <ul className="normal">
            <li>
              <Link href="https://dope-wars.notion.site/Hustler-Minting-and-Unbundling-25c6dfb9dca64196aedf8def6297c51a"><a className="primary">The Dope Wars Hustler Guide</a></Link>
            </li>
            <li>
              <Link href="/hustlers"><a className="primary">Gangsta Party</a></Link>
            </li>
          </ul>
        </PanelBody>
      </PanelContainer>
      <Alert status="info" css={css`max-height:100px;`}>
        <AlertIcon />
        <div>
          All OGs have been Initiated, but Hustlers are an infinite mint! Make as many as you want.
          <br/>
          See you on the streets in 2022.
        </div>
      </Alert>
    </VerticalPanelStack>
  );
};
export default InitiationInfo;
