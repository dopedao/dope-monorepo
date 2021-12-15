import styled from '@emotion/styled';
import DesktopWindow from 'components/DesktopWindow';
import Head from 'components/Head';
<<<<<<< HEAD:packages/web/pages/dope-tv.tsx
import Twitch from 'src/twitch_embed_v1';
=======
import Twitch from 'utils/twitch-embed-v1';
>>>>>>> origin/master:packages/web/src/pages/dope-tv.tsx

const title = 'DOPE TV';

const TwitchEmbedContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default function DopeTv() {
  const embedTwitchStream = () => {
    new Twitch.Embed('twitch-embed-container', {
      width: '100%',
      height: '100%',
      channel: 'dopetvmusic',
      // Only needed if this page is going to be embedded on other websites
      parent: ['localhost', 'dopewars.gg'],
      layout: 'video',
    });
  };

  return (
    <>
      <Head title={title} />
      <DesktopWindow title={title} width={1024} height={576} onResize={embedTwitchStream}>
        <TwitchEmbedContainer id="twitch-embed-container" />
      </DesktopWindow>
    </>
  );
}
