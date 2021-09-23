import ReactMarkdown from 'react-markdown';
import Head from '../components/Head';
import DesktopWindow from '../components/DesktopWindow';

const AboutContent = `
# A DOPE DAO Production

**Producers**
- 0xtart
- facesof.eth
- sonnydaddy
`;

export default function About() {
  return (
    <>
      <Head title={'About'} />
      <DesktopWindow title="ABOUT.FAQ" width={640} height={960}>
        <ReactMarkdown>{AboutContent}</ReactMarkdown>
      </DesktopWindow>
    </>
  );
}
