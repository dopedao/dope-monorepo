import { Accordion } from '@chakra-ui/react'

import Section from "./Section"
import Dopes from './Dopes';
import Gear from './Gear';
import Hustlers from './Hustlers';

const Profile = ({section}: { section: string | string[] | undefined }) => {
  
  const getDefaultIndex = () => {
    switch (section?.toLowerCase()) {
      case 'gear':
        return 2;
      case 'hustlers':
        return 1;
      case 'dope':
      default: 
        return 0;
    }
  }

  return (
    <Accordion
      allowToggle
      background="#fff"
      defaultIndex={getDefaultIndex()}
    >
      <Section>
        <Dopes />
      </Section>
      <Section>
        <Hustlers />
      </Section>
      <Section>
        <Gear />
      </Section>
    </Accordion>
  )
}

export default Profile;
