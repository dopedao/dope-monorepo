import { media } from 'styles/mixins';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';

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
          <div>Initiation</div>
        </PanelTitleBar>
        <PanelBody
          css={css`
            height: 100%;
          `}
        >
          <p>
            Hustlers are the in-game representation of characters inside DOPE WARS. Each Hustler
            gains RESPECT based on the amount of time passed since their Initiation. RESPECT will be
            useful in the upcoming DOPE WARS game, and provide your Hustler with certain advantages.
          </p>
          <p>
            <em>
              For a limited time 500 OG Hustlers are available for Initiation. OGs start out with
              100 RESPECT Points, and receive a special title.
            </em>
          </p>
          <p>
            A Hustler’s appearance is customizable, based on the items in their inventory and
            attributes you select. All Hustler artwork is stored on the Ethereum blockchain, with a
            next-level technical approach that few projects can match.
          </p>
        </PanelBody>
      </PanelContainer>
      <PanelContainer>
        <PanelTitleBar>Unbundling</PanelTitleBar>
        <PanelBody
          css={css`
            height: 100%;
          `}
        >
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
        </PanelBody>
      </PanelContainer>
    </VerticalPanelStack>
  );
};
export default InitiationInfo;
