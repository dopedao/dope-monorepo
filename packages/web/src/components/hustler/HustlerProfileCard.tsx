import { css } from '@emotion/react';
import { Hustler } from 'generated/graphql';
import DopeCardTitleButton from 'features/dope/components/DopeCardTitleButton';
import LoadingBlock from 'components/LoadingBlock';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import RenderFromChain from 'components/hustler/RenderFromChain';
import CartIcon from 'ui/svg/Cart';

const HustlerProfileCard = ({hustler}: {hustler: Partial<Hustler>}) => {

  const quixPrefix = 'https://quixotic.io/asset/opt/0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E';

  if (!hustler.svg || !hustler.id) return <LoadingBlock />;
  return(
    <PanelContainer key={hustler.id}>
      <PanelTitleBarFlex>
        <div>
          {parseInt(hustler.id) < 500 && 'OG'} 
          &nbsp;
          {hustler.name}
        </div>
        <DopeCardTitleButton css={css`width:50px;`}>
          <a 
            href={`${quixPrefix}/${hustler.id}`}
            target="quix"
          >
            <CartIcon color="white" width={20} height={20} />
          </a>
        </DopeCardTitleButton>
      </PanelTitleBarFlex>
      <PanelBody>
        <a 
          href={`/hustlers/${hustler.id}`} 
          css={css`width:100%;display:block;`}
        >
          <RenderFromChain
            data={{
              image: hustler.svg,
              name: hustler.name,
            }}
          />
        </a>
      </PanelBody>
    </PanelContainer>
  )
}


export default HustlerProfileCard;