import ReactMarkdown from 'react-markdown';
import Head from '../components/head';
import AppWindow from '../components/AppWindow';

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
      <AppWindow>
        <ReactMarkdown>{AboutContent}</ReactMarkdown>
      </AppWindow>
    </>
  );
}
