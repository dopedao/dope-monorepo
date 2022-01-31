import { Accordion } from '@chakra-ui/react'

import Section from "./Section"
import Dopes from './Dopes';
import Gear from './Gear';
import Hustlers from './Hustlers';

const Profile = () => {
  return (
    <Accordion
      allowMultiple
      allowToggle
      background="#fff"
      defaultIndex={0}
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
