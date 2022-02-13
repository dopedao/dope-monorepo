import { css } from '@emotion/react';
import { Hustler } from 'generated/graphql';
import LoadingBlock from 'components/LoadingBlock';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import RenderFromChain from 'components/hustler/RenderFromChain';

const HustlerProfileCard = ({hustler}: {hustler: Partial<Hustler>}) => {

  if (!hustler.svg) return <LoadingBlock />;
  return(
    <PanelContainer key={hustler.id}>
      <PanelTitleBar centered>
        {parseInt(hustler.id) < 500 && 'OG'} 
        &nbsp;
        {hustler.name}
      </PanelTitleBar>
      <PanelBody>
        <a 
          href={`/hustlers/${hustler.id}/flex`} 
          css={css`width:100%;display:block;`}
        >
          <RenderFromChain
            data={{
              image: hustler.svg,
              name: hustler.name,
            }}
            id={hustler.id}
          />
        </a>
      </PanelBody>
    </PanelContainer>
  )
}


export default HustlerProfileCard;