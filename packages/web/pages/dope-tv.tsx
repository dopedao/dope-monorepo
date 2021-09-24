import Head from '../components/Head';
import DesktopWindow from '../components/DesktopWindow';

const title = 'DOPE TV';

export default function DopeTv() {
  return (
    <>
      <Head title={title} />
      <DesktopWindow title={title} width={1024} height={576}>
        <iframe
          src="https://player.twitch.tv/?dopetvmusic&parent=dopewars.gg"
          height="100%"
          width="100%"
        >
        </iframe>
      </DesktopWindow>
    </>
  );
}
