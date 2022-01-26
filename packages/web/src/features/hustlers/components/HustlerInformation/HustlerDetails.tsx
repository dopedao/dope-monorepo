import { HustlerDetailsProps } from './HustlerInformationTabs';
import { Button } from '@chakra-ui/react';
import { 
  ControlsWrapper,
  ControlsBody,
  PanelFooter,
  LineContent,
  LineKey,
  LineValue 
} from 'features/hustlers/components/HustlerInformation/styles';

const formatHustlerDetails = ({ name, id, title, respect }: HustlerDetailsProps) => [
  {
    key: 'Name:',
    value: name,
  },
  {
    key: 'Id:',
    value: `#${id}`,
  },
  {
    key: 'Title:',
    value: title,
  },
  {
    key: 'Respect:',
    value: respect,
  },
];

const HustlerDetails = (props: HustlerDetailsProps) => (
  <ControlsWrapper>
    <ControlsBody>
      {formatHustlerDetails(props).map(detail => (
        <LineContent key={detail.key}>
          <LineKey>{detail.key}</LineKey>
          <LineValue>{detail.value}</LineValue>
        </LineContent>
      ))}
    </ControlsBody>
    <PanelFooter>
      <Button type="button" loadingText="Processing...">
        Change Appearance
      </Button>
    </PanelFooter>
  </ControlsWrapper>
);

export default HustlerDetails;
