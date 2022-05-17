import { Button, Center, Checkbox, Container, HStack, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spacer, Switch, Text, VStack } from "@chakra-ui/react";
import MusicManager, { Song } from "game/utils/MusicManager";
import React from "react";

const NowPlaying = (props: {
    musicManager: MusicManager,
    forceUpdate: React.DispatchWithoutAction
}) => {
    const [ songProgress, setSongProgress ] = React.useState<number>(props.musicManager.currentSong?.song.seek() ?? 0);
    
    React.useEffect(() => {
        let intervalId: NodeJS.Timer;
        if (props.musicManager.currentSong)
            intervalId = setInterval(() => {
                setSongProgress(props.musicManager.currentSong?.song.seek() ?? 0);
            });
        
        return () => {
            clearInterval(intervalId);
        }
    }, [props.musicManager.currentSong]);

    return (
        <Container style={{
            padding: "0.5rem",
            minWidth: "60%",
            borderRadius: "7px",
            backgroundColor: "rgba(255,255,255,0.5)",
        }}>
            <HStack>
                <div style={{
                    width: "70%"
                }}>
                    <div>
                        <Text fontWeight="bold" paddingBottom="0px">
                            Currently playing
                        </Text>
                        <Text paddingBottom="0px">
                            {props.musicManager.currentSong?.name ?? "No song playing"}
                        </Text>
                        <Slider 
                            value={songProgress} 
                            onChange={(v) => {
                                props.musicManager.currentSong?.song.seek(v);
                            }} 
                            max={props.musicManager.currentSong?.song.duration()}
                            width="100%"
                            disabled={!props.musicManager.currentSong}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb style={{
                                boxShadow: "none"
                            }} />
                        </Slider>
                    </div>
                    {
                        props.musicManager.upcomingSong && <div>
                        <Text fontWeight="bold" paddingBottom="0px">
                            Upcoming
                        </Text>
                        <Text>
                            {props.musicManager.upcomingSong.name}
                        </Text>
                    </div>
                    }
                </div>
                <Spacer />
                <VStack>
                    <Checkbox 
                        disabled={!props.musicManager.currentSong} 
                        onChange={(e) => props.musicManager.currentSong?.song.loop(e.target.checked)}
                        isChecked={props.musicManager.currentSong?.song.loop()}>
                        🔁
                    </Checkbox>
                    {
                        <Button variant="primary" disabled={!props.musicManager.currentSong} onClick={() => {
                            !props.musicManager.currentSong?.song.playing() ? 
                                props.musicManager.currentSong?.song.play() : 
                                    props.musicManager.currentSong?.song.pause();
                            props.forceUpdate();
                        }}>
                            {
                                !props.musicManager.currentSong?.song.playing() ? "Resume" : "Pause"
                            }
                        </Button>
                    }
                    <Button variant="primary" onClick={() => {
                        props.musicManager.shuffle(undefined, undefined, false);
                        props.forceUpdate();
                    }}>
                        Skip
                    </Button>
                </VStack>
            </HStack>
        </Container>
    )
}

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
            props.musicManager.shuffle(props.song, undefined, false);
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

    return (
        <div>
            <HStack style={{
                alignItems: "stretch",
                marginBlock: "1rem",
            }}>
                {
                    props.musicManager.currentSong && 
                    <NowPlaying musicManager={props.musicManager} forceUpdate={forceUpdate} />
                }
                <Container style={{
                    padding: "0.5rem",
                    borderRadius: "7px",
                    minHeight: "100%",
                    backgroundColor: "rgba(255,255,255,0.5)",
                }}>
                    <div>
                        <div>
                            <Text fontWeight="bold" paddingBottom="0px">
                                Volume
                            </Text>
                            <Slider
                                defaultValue={Howler.volume() * 100}
                                onChange={(v) => Howler.volume(v / 100)}
                                width="70%"
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </div>
                        <div>
                            <Text fontWeight="bold" paddingBottom="0px">
                                Rate
                            </Text>
                            <Slider
                                defaultValue={(props.musicManager.currentSong?.song.rate() ?? 1) * 100}
                                onChange={(v) => props.musicManager.currentSong?.song.rate(v / 100)}
                                width="70%"
                                min={0.5 * 100}
                                max={4 * 100}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </div>
                    </div>
                </Container>
            </HStack>
            
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