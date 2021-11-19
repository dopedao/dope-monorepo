import { useEffect, useRef, useState } from "react";
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

const BUCKET_URL = 'https://dope-wars-gg.s3.us-west-1.amazonaws.com/';
const TRACKS = [
  {
    title: '2_of_Amerikas_Most_Wanted.mp3',
    duration: 213 // 3:33
  },
  {
    title: 'Shook_Ones_Pt_2.mp3',
    duration: 122 // 2:02
  },
  {
    title: 'Aint_Nuthin_But_a_G_thang.mp3',
    duration: 249 // 4:09
  },
  {
    title: 'CREAM_WuTang.mp3',
    duration: 192 // 3:12
  },
  {
    title: 'BIG_POPPA.mp3',
    duration: 288 // 4:48
  },
  {
    title: 'So_Fresh_So_Clean.mp3',
    duration: 238 // 3:58
  },
];

const playerTracks: WebAmpTrack[] = [];

TRACKS.forEach(track => {
  playerTracks.push({
    metaData: {
      artist: 'DOPE DAO',
      title: track.title,
    },
    url: BUCKET_URL + track.title,
    duration: track.duration,
  });
});

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate(-50%, -50%);
`

interface Props {
  hidden: boolean;
}

const WebAmpPlayer = ({hidden}: Props) => {
  const containerEl = useRef(null);
  const previousWebAmp = useRef(null);

  useEffect(() => {
    if (typeof window == 'undefined' || !containerEl.current || hidden) return;
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/webamp@1.4.2/built/webamp.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (previousWebAmp.current) previousWebAmp.current.dispose();
      const Webamp = (window as any).Webamp;
      const webamp = new Webamp({initialTracks: playerTracks});
      // Returns a promise indicating when it's done loading.
      webamp.renderWhenReady(containerEl.current);
      previousWebAmp.current = webamp;
    }

    return () => {
      if (previousWebAmp.current) {
        previousWebAmp.current.dispose();
        previousWebAmp.current = null;
      }
    };
  }, [containerEl, hidden]);

  return (
    <Container id="webamp-container" ref={containerEl}></Container>
  );
};

export default WebAmpPlayer;
