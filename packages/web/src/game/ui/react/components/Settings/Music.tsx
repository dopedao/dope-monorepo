import {
  Button,
  Center,
  Checkbox,
  Container,
  HStack,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import MusicManager, { Song } from 'game/utils/MusicManager';
import React from 'react';
import { Box } from '@chakra-ui/react';

const NowPlaying = (props: {
  musicManager: MusicManager;
  forceUpdate: React.DispatchWithoutAction;
}) => {
  const [songProgress, setSongProgress] = React.useState<number>(
    props.musicManager.currentSong?.song.seek() ?? 0,
  );

  React.useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (props.musicManager.currentSong)
      intervalId = setInterval(() => {
        setSongProgress(props.musicManager.currentSong?.song.seek() ?? 0);
      });

    return () => {
      clearInterval(intervalId);
    };
  }, [props.musicManager.currentSong]);

  return (
    <Container
      style={{
        padding: '0.5rem',
        minWidth: '60%',
        borderRadius: '7px',
        backgroundColor: 'rgba(255,255,255,0.5)',
      }}
    >
      <HStack>
        <Box
          style={{
            width: '70%',
          }}
        >
          <Box>
            <Text fontWeight="bold" paddingBottom="0px">
              Currently playing
            </Text>
            <Text paddingBottom="0px">
              {props.musicManager.currentSong?.name ?? 'No song playing'}
            </Text>
            <Slider
              value={songProgress}
              onChange={v => {
                props.musicManager.currentSong?.song.seek(v);
              }}
              max={props.musicManager.currentSong?.song.duration()}
              width="100%"
              // _disabled={!props.musicManager.currentSong}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb
                style={{
                  boxShadow: 'none',
                }}
              />
            </Slider>
          </Box>
          {props.musicManager.upcomingSong && (
            <Box>
              <Text fontWeight="bold" paddingBottom="0px">
                Upcoming
              </Text>
              <Text>{props.musicManager.upcomingSong.name}</Text>
            </Box>
          )}
        </Box>
        <Spacer />
        <VStack>
          <Checkbox
            isDisabled={!props.musicManager.currentSong}
            onChange={e => {
              props.musicManager.currentSong?.song.loop(e.target.checked);
              props.forceUpdate();
            }}
            isChecked={props.musicManager.currentSong?.song.loop()}
          >
            🔁
          </Checkbox>
          {
            <Button
              variant="primary"
              isDisabled={!props.musicManager.currentSong}
              onClick={() => {
                !props.musicManager.currentSong?.song.playing()
                  ? props.musicManager.currentSong?.song.play()
                  : props.musicManager.currentSong?.song.pause();
                props.forceUpdate();
              }}
            >
              {!props.musicManager.currentSong?.song.playing() ? 'Resume' : 'Pause'}
            </Button>
          }
          <Button
            variant="primary"
            onClick={() => {
              props.musicManager.shuffle(undefined, undefined, false);
              props.forceUpdate();
            }}
          >
            Skip
          </Button>
        </VStack>
      </HStack>
    </Container>
  );
};

const SongComponent = (props: {
  song: Song;
  musicManager: MusicManager;
  updateState: React.DispatchWithoutAction;
}) => (
  <HStack>
    <Text>{props.song.name}</Text>
    <Spacer />
    <Button
      // backgroundColor="green"
      onClick={() => {
        props.musicManager.shuffle(props.song, undefined, false);
        props.updateState();
      }}
      variant="primary"
      isDisabled={props.song === props.musicManager.currentSong}
    >
      Play
    </Button>
  </HStack>
);

const Music = (props: { musicManager: MusicManager }) => {
  const [, forceUpdate] = React.useReducer(i => i + 1, 0);

  return (
    <Box>
      <HStack
        style={{
          alignItems: 'stretch',
          marginBlock: '1rem',
        }}
      >
        {props.musicManager.currentSong && (
          <NowPlaying musicManager={props.musicManager} forceUpdate={forceUpdate} />
        )}
        <Container
          style={{
            padding: '0.5rem',
            borderRadius: '7px',
            width: '6%',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        >
          <Box>
            🔊
            <Slider
              orientation="vertical"
              defaultValue={Howler.volume() * 100}
              onChange={v => Howler.volume(v / 100)}
              // height="70%"
              // width="50%"
              minH={24}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Container>
      </HStack>

      <SimpleGrid columns={2} spacing={5} paddingBottom="2">
        {props.musicManager.songs.map((song, i) => (
          <SongComponent
            key={i}
            song={song}
            musicManager={props.musicManager}
            updateState={forceUpdate}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Music;
