import { css } from '@emotion/react';
import { Item } from 'generated/graphql';
import DopeCardTitleButton from 'features/dope/components/DopeCardTitleButton';
import LoadingBlock from 'components/LoadingBlock';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import RenderFromChain from 'components/hustler/RenderFromChain';
import CartIcon from 'ui/svg/Cart';

// This should be Partial<Item> but I couldn't get it working…
const GearCard = ({gear}: {gear: any}) => {

  const quixPrefix = 'https://quixotic.io/collection/gear?query=';
  const svg = (gear.base?.svg ? gear.base.svg : gear.svg);

  if (!svg || !gear.id) return <LoadingBlock />;
  return(
    <PanelContainer key={gear.id}>
      <PanelTitleBarFlex>
        <div>
          {gear.name}
        </div>
        <DopeCardTitleButton css={css`width:50px;`}>
          <a 
            href={`${quixPrefix}${encodeURIComponent(gear.name || '')}`}
            target="quix"
          >
            <CartIcon color="white" width={20} height={20} />
          </a>
        </DopeCardTitleButton>
      </PanelTitleBarFlex>
      <PanelBody>
        <RenderFromChain
          data={{
            image: svg,
            name: gear.name,
          }}
        />
      </PanelBody>
    </PanelContainer>
  )
}

export default GearCard;