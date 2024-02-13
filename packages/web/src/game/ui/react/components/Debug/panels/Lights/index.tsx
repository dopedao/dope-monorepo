/* eslint-disable react/no-children-prop */
import { Checkbox, Button, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";
import Player from "game/entities/player/Player";
import GameScene from "game/scenes/Game";
import { useReducer } from "react";
import Position from "../../components/Position";

const LightsPanel = (props: { player: Player, lights: Phaser.GameObjects.LightsManager }) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    
    const player = props.player;
    const lights = props.lights;

    return (
        <>
            <Box style={{
                paddingLeft: '1rem',
            }}>
                Enabled: <Checkbox onChange={(e) => lights.active = e.target.checked} defaultChecked={lights.active}/>
                <br/>
                Number of lights: {lights.getLightCount()}
                <br/>
                Ambient color:
                <input 
                    type="color" 
                    onChange={(e) => {
                        const value = e.target.value;
                        const color = value.substring(1);
                        const r = parseInt(color.substring(0, 2), 16) / 255;
                        const g = parseInt(color.substring(2, 4), 16) / 255;
                        const b = parseInt(color.substring(4, 6), 16) / 255;
                        lights.ambientColor.set(r, g, b);
                    }}
                    defaultValue={'#' + 
                        (lights.ambientColor.r * 255).toString(16) + 
                        (lights.ambientColor.g * 255).toString(16) + 
                        (lights.ambientColor.b * 255).toString(16)}
                />
                <br/>
                <br />
                <Button onClick={(e) => {
                    lights.addLight(player.x, player.y);
                    forceUpdate();
                }}>
                    Add light
                </Button>
                <br />
                <Button onClick={(e) => {
                    let layer: Phaser.GameObjects.Layer;
                    if (!(layer = (lights as any).pointLightLayer))
                        layer = (lights as any).pointLightLayer = player.scene.add.layer();
                    layer.add(lights.addPointLight(player.x, player.y));
                    forceUpdate();
                }}>
                    Add pointlight
                </Button>
            </Box>
            <br/>
            <Accordion defaultIndex={0}>
                {
                    // getLights doesnt actually return an array of the lights... it returns an object with the dist and light
                    lights.getLights(player.scene.cameras.main).map((light, i) => {
                        const distance = (light as any).distance;
                        light = (light as any).light;
                        return <AccordionItem key={i}>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        Light: {light.x} {light.y}
                                        <br />
                                        PointLight: {light instanceof Phaser.GameObjects.PointLight ? '✅' : '❌'}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Position object={light}/>
                                <InputGroup size="sm">
                                    <InputLeftAddon children='Radius' />
                                    <Input onChange={(e) => light.radius = Number.parseFloat(e.target.value) ?? 0} placeholder={light.radius.toString()} />
                                </InputGroup>
                                <InputGroup size="sm">
                                    <InputLeftAddon children='Intensity' />
                                    <Input onChange={(e) => light.intensity = Number.parseFloat(e.target.value) ?? 0} placeholder={light.intensity.toString()} />
                                </InputGroup>
                                <br/>
                                Visible: <Checkbox onChange={(e) => light.visible = e.target.checked} defaultChecked={light.visible}/>
                                <Box>
                                    Color:
                                    <input 
                                        type="color" 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const color = value.substring(1);
                                            const r = parseInt(color.substring(0, 2), 16) / 255;
                                            const g = parseInt(color.substring(2, 4), 16) / 255;
                                            const b = parseInt(color.substring(4, 6), 16) / 255;
                                            light.color.set(r, g, b);
                                        }}
                                        defaultValue={'#' + 
                                            ((light.color as any).r * 255).toString(16).padStart(2, '0') + 
                                            ((light.color as any).g * 255).toString(16).padStart(2, '0') + 
                                            ((light.color as any).b * 255).toString(16).padStart(2, '0')}
                                    />
                                </Box>
                                <br/>
                                <Button variant="cny" onClick={(e) => {
                                    if (light instanceof Phaser.GameObjects.PointLight)
                                        (light as any).layer.remove(light);
                                    else
                                        lights.removeLight(light);
                                    forceUpdate();
                                }}>
                                    Remove light
                                </Button>
                            </AccordionPanel>
                        </AccordionItem>
                    })
                }
            </Accordion>
        </>
    )
}

export default LightsPanel;