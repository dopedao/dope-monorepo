import { Box, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import { CSSProperties } from 'react';

import Item from 'game/entities/player/inventory/Item';
import Inventory from '../../../entities/player/inventory/Inventory';
import Quest from 'game/entities/player/quests/Quest';

interface InventoryProps {
  inventory: Inventory;
  quests: Array<Quest>;
  onItemClick: (item: Item) => void;
}

const inventoryBackgroundStyle: CSSProperties = {
  width: '100%',
  height: '100vh',
  backdropFilter: 'blur(2px)',
  backgroundColor: 'rgba(0,0,0,0.2)',
};

const gridItemStyle: CSSProperties = {
  borderWidth: '100px',
  marginTop: '7vh',
  marginBottom: '7vh',
  marginRight: '3%',
  marginLeft: '3%',
  borderRadius: '20px',
  // backdropFilter: "blur(4px)",
  backgroundColor: 'rgba(0,0,0,0.15)',
};

const questItemStyle: CSSProperties = {
  marginTop: '10%',
  marginBottom: '10%',
  marginRight: '5%',
  marginLeft: '5%',
  borderRadius: '25px',
  backgroundColor: 'rgba(0,0,0,0.15)',
};

const questNameStyle: CSSProperties = {
  paddingTop: '1%',
  marginBottom: '5%',
  marginRight: '5%',
  marginLeft: '5%',

  fontSize: '1.5em',
  color: 'rgba(255,255,255,0.7)',
};

export default function InventoryComponent(props: InventoryProps) {
  return (
    <ChakraProvider>
      <Box style={inventoryBackgroundStyle}>
        <Flex width="100%" height="100vh" gap={15}>
          <Box width="35%" style={gridItemStyle}>
            {
              <Grid>
                {props.quests.map((quest, index) => (
                  <GridItem key={index}>
                    <Box style={questItemStyle}>
                      <Text style={questNameStyle}>{quest.name}</Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            }
          </Box>
          <Box width="65%" style={gridItemStyle}></Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
