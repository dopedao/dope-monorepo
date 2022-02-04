import { Accordion } from '@chakra-ui/react'

import Section from "./Section"
import Dopes from './Dopes';
import Gear from './Gear';
import Hustlers from './Hustlers';

import useQueryParam from 'utils/use-query-param';
const SECTIONS = ['Dope', 'Hustlers', 'Gear'];

const Profile = () => {

  const [section, setSection] = useQueryParam('section', SECTIONS[0]);

  return (
    <Accordion
      allowToggle
      background="#fff"
      defaultIndex={SECTIONS.findIndex(val => val === section)}
      onChange={(idx) => { 
        if (idx == -1) return;
        const sectionIdx = Array.isArray(idx) ? idx[0] : idx;
        setSection(SECTIONS[sectionIdx]); 
      }}
    >
      <Section>
        <Hustlers />
      </Section>
      <Section>
        <Gear />
      </Section>
      <Section>
        <Dopes />
      </Section>
    </Accordion>
  )
}

export default Profile;
