import RenderFromLootId from 'components/hustler/RenderFromLootId';
import { StepsProps } from 'features/hustlers/modules/Steps';
import { Wrapper } from './styles';

const Customize = ({ hustlerConfig }: StepsProps) => (
  <Wrapper>
    <RenderFromLootId
      id={hustlerConfig.dopeId}
      sex={hustlerConfig.sex}
      body={hustlerConfig.body}
      hair={hustlerConfig.hair}
      facialHair={hustlerConfig.facialHair}
      bgColor={hustlerConfig.bgColor}
    />
  </Wrapper>
);

export default Customize;
