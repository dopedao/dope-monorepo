import AppWindow from '../../components/AppWindow';
import Head from '../../components/Head';
import StackedResponsiveContainer from '../../components/StackedResponsiveContainer';
import PanelContainer from '../../components/PanelContainer';
import PanelTitleBar from '../../components/PanelTitleBar';
import PanelFooter from '../../components/PanelFooter';

const title = 'Initiate New Hustler';

export default function Initiate() {
  return (
    <AppWindow requiresWalletConnection={true}>
      <Head title={title} />
      <StackedResponsiveContainer>
        <div>
          <PanelContainer>
            <PanelTitleBar><div>Initiation</div></PanelTitleBar>
            <p>
              Hustlers are the in-game representation of characters inside DOPE WARS. Each Hustler gains RESPECT based on the amount of time passed since their Initiation. RESPECT will be useful in the upcoming DOPE WARS game, and provide your Hustler with certain advantages.
            </p>
            <p>
              For a limited time 500 OG Hustlers are availble for Initiation. OGs start out with 100 RESPECT Points, and receive a special title.A Hustler’s appearance is customizable, based on the items in their inventory and attributes you select.
            </p>
            <p>
              All Hustler artwork is stored on the Ethereum blockchain, with a next-level technical approach that few projects can match.
            </p>
          </PanelContainer>
          <PanelContainer>
            <PanelTitleBar>Unbundling</PanelTitleBar>
            <p>
              Initiating a hustler will Unbundle and create 9 new Item NFTs from one DOPE NFT, and equip them on your Hustler. Because each of these new items become their own separate NFT, they’re also tradeable on the secondary market.
            </p>
            <p>
              Soon™ you’ll be able to upgrade your Hustler by mixing-and-matching items from multiple DOPE NFT bundles – with over ONE BILLION possible combinations.
            </p>
            <p>
              Each DOPE NFT can only be unbundled once. The DOPE NFT remains in your wallet and still serves as the governance token for DopeWars DAO. Expect each DOPE NFT to have more utility developed for it in the future.
            </p>
          </PanelContainer>
        </div>

        <PanelContainer>
          <PanelTitleBar>Hustler</PanelTitleBar>
          <p>
            Hustler img here
          </p>
        </PanelContainer>

      </StackedResponsiveContainer>
    </AppWindow>
  );
}
