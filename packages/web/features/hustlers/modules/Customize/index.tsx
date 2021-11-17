import RenderFromLootId from 'components/hustler/RenderFromLootId';
import { StepsProps } from 'features/hustlers/modules/Steps';
import { Wrapper } from './styles';

const Customize = ({ id, hustlerConfig }: StepsProps) => (
  <Wrapper>
    <RenderFromLootId
      id={id?.toString() ?? '1'}
      sex={hustlerConfig.sex}
      body={hustlerConfig.body}
      hair={hustlerConfig.hair}
      facialHair={hustlerConfig.facialHair}
      bgColor={hustlerConfig.bgColor}
    />
  </Wrapper>
);

export default Customize;
