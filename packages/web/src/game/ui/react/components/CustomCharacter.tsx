import {
  Box,
  Button,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { Base, Categories, CharacterCategories, SpritesMap } from 'game/constants/Sprites';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import DesktopWindow from 'components/DesktopWindow';
import AppWindow from 'components/AppWindow';

export default function CustomCharacter(props: { gameWidth: number }) {
  return (
    <DesktopWindow title="Character customization" width={props.gameWidth / 2}>
      <Box style={{ backgroundColor: 'white' }}>
        {/* {        <Container style={{marginBottom: "5vh", marginTop: "5vh"}}>
                        <FormControl>
                            <FormLabel htmlFor='clothes'>Clothes</FormLabel>
                            <Select id='clothes' placeholder='Select some clothes'>
                                {Object.values(SpritesMap[Categories.Character][Base.Male][CharacterCategories.Clothes]).map(clothes => <option key={clothes} >{clothes}</option>)}
                            </Select>
                            <FormLabel htmlFor='mask'>Mask</FormLabel>
                            <Select id='mask' placeholder='Select a mask'>
                                {Object.values(SpritesMap[Categories.Character][Base.Male][CharacterCategories.Mask]).map(mask => <option key={mask} >{mask}</option>)}
                            </Select>
                            <FormLabel htmlFor='feet'>Shoes</FormLabel>
                            <Select id='feet' placeholder='Select a pair of shoes'>
                                {Object.values(SpritesMap[Categories.Character][Base.Male][CharacterCategories.Feet]).map(feet => <option key={feet} >{feet}</option>)}
                            </Select>
                            <FormLabel htmlFor='hands'>Gloves</FormLabel>
                            <Select id='hands' placeholder='Select gloves'>
                                {Object.values(SpritesMap[Categories.Character][Base.Male][CharacterCategories.Hands]).map(hands => <option key={hands} >{hands}</option>)}
                            </Select>
                        </FormControl>
                    </Container>} */}
        <h1>Hello</h1>
      </Box>
    </DesktopWindow>
  );
}
