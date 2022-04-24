import { Button, Center, Container, HStack, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spacer, Text, VStack } from "@chakra-ui/react";
import MusicManager, { Song } from "game/utils/MusicManager";
import React from "react";

const SongComponent = (props: {
    song: Song,
    musicManager: MusicManager,
    updateState: React.DispatchWithoutAction
}) => <HStack>
    <Text>
        {props.song.name}
    </Text>
    <Spacer />
    <Button
        // backgroundColor="green"
        onClick={() => {
            props.musicManager.shuffle(props.song, false);
            props.updateState();
        }}
        variant="primary"
        disabled={props.song === props.musicManager.currentSong}
    >
        Play
    </Button>
</HStack>

const Music = (props: {
    musicManager: MusicManager
}) => {
    const [, forceUpdate] = React.useReducer((i) => i + 1, 0);
    const [ songProgress, setSongProgress ] = React.useState(props.musicManager.currentSong?.song.seek);

    React.useEffect(() => {
        let intervalId: NodeJS.Timer;
        if (props.musicManager.currentSong)
            intervalId = setInterval(() => {
                setSongProgress(props.musicManager.currentSong!.song.seek);
            });
        
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return (
        <div>
            <Container style={{
                marginTop: "1rem",
                marginBottom: "1rem",
                padding: "0.5rem",
                width: "70%",
                borderRadius: "7px",
                backgroundColor: "rgba(255,255,255,0.5)",
            }}>
                {
                    props.musicManager.currentSong && 
                        <HStack width="100%">
                            <div>
                                <Text fontWeight="bold" paddingBottom="0px">
                                    Currently playing
                                </Text>
                                <Text paddingBottom="0px">
                                    {props.musicManager.currentSong.name}
                                </Text>
                                <Slider value={songProgress} onChange={(v) => {
                                    props.musicManager.currentSong?.song.setSeek(v);
                                }}>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb style={{
                                        boxShadow: "none"
                                    }} />
                                </Slider>
                            </div>
                            <Spacer />
                            <VStack>
                                {
                                    <Button variant="primary" onClick={() => {
                                        props.musicManager.currentSong!.song.isPaused ? 
                                            props.musicManager.currentSong!.song.resume() : 
                                                props.musicManager.currentSong!.song.pause();
                                        forceUpdate();
                                    }}>
                                        {
                                            props.musicManager.currentSong.song.isPaused ? "Resume" : "Pause"
                                        }
                                    </Button>
                                }
                                <Button variant="primary" onClick={() => {
                                    props.musicManager.shuffle(undefined, false);
                                    forceUpdate();
                                }}>
                                    Skip
                                </Button>
                            </VStack>
                        </HStack>
                }
            </Container>
            <SimpleGrid columns={2} spacing={5} paddingBottom="2">
                {
                    props.musicManager.songs.map((song, i) => 
                        <SongComponent key={i} song={song} musicManager={props.musicManager} updateState={forceUpdate} />)
                }
            </SimpleGrid>
        </div>
    )
}

export default Music;