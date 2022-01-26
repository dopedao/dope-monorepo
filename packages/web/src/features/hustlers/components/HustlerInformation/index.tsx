import { css } from '@emotion/react';
import { BigNumber } from '@ethersproject/bignumber';
import { HustlerCustomization } from 'utils/HustlerConfig';
import HustlerInformationTabs from './HustlerInformationTabs';
import PanelContainer from 'components/PanelContainer';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import RenderFromItemIds from 'components/hustler/RenderFromItemIds';
import styled from '@emotion/styled';
import { Hustler } from 'generated/graphql';
import HustlerActions from './actions/index';

export type DetailsHustlerProps = {
  huslter: Hustler;
  ogTitle?: string;
  itemIds?: BigNumber[];
  config: HustlerCustomization;
};

const HustlerCard = styled.div<{ bgColor?: string }>(props => ({
  backgroundColor: props.bgColor || '',
  margin: '16px 16px 0 16px',
  border: '2px solid #000000',
  borderRadius: '4px',
  height: 'calc(100% - 60px - 16px)',
}));

const ConfigureInformations = ({ huslter, config, itemIds, ogTitle }: DetailsHustlerProps) => {
  return (
    <StackedResponsiveContainer>
      <PanelContainer
        css={css`
          min-height: 500px;
          background-color: #edefee;
        `}
      >
        <HustlerCard bgColor={config.bgColor}>
          {itemIds && (
            <RenderFromItemIds
              bgColor={config.bgColor}
              body={config.body}
              facialHair={config.facialHair}
              hair={config.hair}
              itemIds={itemIds}
              name={config.name}
              renderName={config.renderName}
              sex={config.sex}
              textColor={config.textColor}
              zoomWindow={config.zoomWindow}
              ogTitle={ogTitle}
              dopeId={config.dopeId}
              isVehicle={config.isVehicle}
            />
          )}
        </HustlerCard>
        <HustlerActions />
      </PanelContainer>
      <HustlerInformationTabs huslter={huslter} />
    </StackedResponsiveContainer>
  );
};

export default ConfigureInformations;
