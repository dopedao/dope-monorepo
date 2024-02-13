import { useRouter } from 'next/router';
import DesktopWindow from 'components/DesktopWindow';
import HustlerContainer from 'features/hustlers/components/HustlerContainer';
import Head from 'components/Head';
import RenderFromDopeIdOnly from 'features/hustlers/components/RenderFromDopeIdOnly';

const TITLE = 'Hustler Preview';

const Preview = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DesktopWindow title={TITLE} onlyFullScreen>
      <Head title={TITLE} />
      <HustlerContainer bgColor="transparent">
        <RenderFromDopeIdOnly id={id ? id.toString() : '1'} />
      </HustlerContainer>
    </DesktopWindow>
  );
};

export default Preview;
