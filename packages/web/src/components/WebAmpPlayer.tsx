import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

// Winamp Player with our DOPE chiptunes
// https://github.com/captbaritone/webamp/blob/master/packages/webamp/docs/usage.md

type WebAmpMetaData = {
  artist: string;
  title: string;
};
type WebAmpTrack = {
  metaData: WebAmpMetaData;
  url: string;
  duration: number;
};

const BUCKET_URL = 'https://dope-wars-gg.s3.us-west-1.amazonaws.com/audio/';
const TRACKS = [
  {
    artist: 'DJ Green Lantern',
    title: 'Dope Wars Mix Vol 1',
    url: 'dope-wars_green-lantern-mix-vol-1.mp3',
    duration: 3520, // 58:40
  },
  {
    artist: '@baronvonfuture',
    title: '2 Of Amerikas Most Wanted',
    url: '2_of_Amerikas_Most_Wanted.mp3',
    duration: 213, // 3:33
  },
  {
    artist: '@baronvonfuture',
    title: 'Shook Ones Pt2',
    url: 'Shook_Ones_Pt_2.mp3',
    duration: 122, // 2:02
  },
  {
    artist: '@baronvonfuture',
    title: 'Aint Nuthin But a G thang',
    url: 'Aint_Nuthin_But_a_G_thang.mp3',
    duration: 249, // 4:09
  },
  {
    artist: '@baronvonfuture',
    title: 'CREAM',
    url: 'CREAM_WuTang.mp3',
    duration: 192, // 3:12
  },
  {
    artist: '@baronvonfuture',
    title: 'BIG POPPA',
    url: 'BIG_POPPA.mp3',
    duration: 288, // 4:48
  },
  {
    artist: '@baronvonfuture',
    title: 'So Fresh So Clean',
    url: 'So_Fresh_So_Clean.mp3',
    duration: 238, // 3:58
  },
];

const playerTracks: WebAmpTrack[] = [];

for (const track of TRACKS) {
  playerTracks.push({
    metaData: {
      title: track.title,
      artist: track.artist,
    },
    url: BUCKET_URL + track.url,
    duration: track.duration,
  });
}

const Container = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  translate: (-50%, -25%);
`;

interface Props {
  onClose?: () => void;
}

const WebAmpPlayer = ({ onClose }: Props) => {
  const containerEl = useRef(null);
  const previousWebAmp = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerEl.current) return;
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/webamp@1.4.2/built/webamp.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (previousWebAmp.current) (previousWebAmp.current as any).dispose();
      const Webamp = (window as any).Webamp;
      const webamp = new Webamp({
        initialTracks: playerTracks,
        // more available here - https://skins.webamp.org/
        initialSkin: { url: '/webamp_skins/dope-amp.zip' },
      });
      // Returns a promise indicating when it's done loading.
      webamp.renderWhenReady(containerEl.current);
      if (onClose) webamp.onClose(() => onClose());
      previousWebAmp.current = webamp;
    };

    return () => {
      if (previousWebAmp.current) {
        (previousWebAmp.current as any).dispose();
        previousWebAmp.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerEl]);

  return <Container id="webamp-container" ref={containerEl} />;
};

export default WebAmpPlayer;
