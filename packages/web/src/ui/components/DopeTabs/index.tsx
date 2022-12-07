import { TabList, Tab, Tabs, TabPanels, TabPanel, Box, Spacer, Text } from '@chakra-ui/react';
import { ReactElement } from 'react-markdown/lib/react-markdown';

export type DopeTabType = { title: string; number?: number; content: ReactElement };

type DopeTabsProps = {
  tabs: DopeTabType[];
};

const formatTitle = (title: string) =>
  title.length > 16
    ? `${title.slice(0, 2)}..${title.slice(title.length - 4, title.length)}`
    : title;

const DopeTabs = ({ tabs }: DopeTabsProps) => {
  return (
    <Tabs>
      <TabList padding="8px 8px 0 8px" backgroundColor="#222222">
        {tabs.map(tab => (
          <Tab
            key={tab.number}
            marginRight="8px"
            maxWidth="239px"
            width="100%"
            backgroundColor="#434345"
            border="2px solid #000000"
            borderTopRadius="10px"
            color="white"
            _selected={{ bg: 'white', color: 'black' }}
            lineHeight="16px"
            fontSize="14px"
            fontFamily="ChicagoFLF"
            padding="6px 12px"
            display="flex"
            justifyContent="space-between"
          >
            <Box flexGrow="1" />
            <Box flexGrow="1">
              <Text margin="0">{formatTitle(tab.title)}</Text>
            </Box>
            <Box flexGrow="1">
              {Boolean(tab.number) && (
                <Box
                  margin="0 0 0 auto"
                  width="min-content"
                  fontSize="12px"
                  lineHeight="12px"
                  color="white"
                  backgroundColor="#202221"
                  borderRadius="23px"
                  padding="4px 8px"
                >
                  {tab.number}
                </Box>
              )}
            </Box>
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map(tab => (
          <TabPanel key={tab.number}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default DopeTabs;
