import DopeTabs, { DopeTabType } from 'ui/components/DopeTabs';
import HustlerDetails from './HustlerDetails';
import HustlerGear from './HustlerGear';
import { Hustler } from 'generated/graphql';

type HustlerInformationTabsProps = {
  huslter: Hustler;
};

export type HustlerDetailsProps = {
  name: string;
  id: string;
  title: string;
  respect: string;
};

const HustlerInformationTabs = ({ huslter }: HustlerInformationTabsProps) => {
  const hustlerDetails = {
    name: huslter.name || '',
    id: huslter.id || '0',
    title: huslter.title || '',
    respect: '', //respect not returned from the backend at the moment
  };

  const tabs: DopeTabType[] = [
    {
      title: 'Details',
      number: 0,
      content: <HustlerDetails {...hustlerDetails} />,
    },
    {
      title: 'Gear',
      number: 0,
      content: <HustlerGear {...huslter} />,
    },
    {
      title: 'Activity',
      number: 0,
      content: (
        <div>
          <p>Soon ...</p>
        </div>
      ),
    },
  ];

  return (<DopeTabs
    tabs={tabs}
    height="calc(100% - 38px)"
  />);
}

export default HustlerInformationTabs;
