import { Accordion } from '@chakra-ui/react'
import Section from "./Section"
import Dopes from './Dopes';
import Gear from './Gear';
import Hustlers from './Hustlers';
import { useRouter } from 'next/router'
import useQueryParam from 'utils/use-query-param';
const SECTIONS = ['Dope', 'Hustlers', 'Gear'];

const Profile = () => {
  const router = useRouter()
  const { walletAddress } = router.query

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
        <Dopes walletAddress={walletAddress} />
      </Section>
      <Section>
        <Hustlers walletAddress={walletAddress} />
      </Section>
      <Section>
        <Gear walletAddress={walletAddress} />
      </Section>
    </Accordion>
  )
}

export default Profile;
