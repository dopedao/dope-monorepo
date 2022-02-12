import { FC, ReactNode } from 'react';
import { AccordionPanel, Box, AccordionPanelProps } from '@chakra-ui/react';

import LoadingBlock from 'components/LoadingBlock';

type SectionContentProps = {
  children: ReactNode;
  isFetching?: boolean;
};

const SectionContent: FC<SectionContentProps & AccordionPanelProps> = ({
  children,
  isFetching,
  ...props
}) => {
  return (
    <AccordionPanel {...props}>
      {isFetching ? (
        <Box>
          <LoadingBlock maxRows={3} />
        </Box>
      ) : (
        children
      )}
    </AccordionPanel>
  );
};

export default SectionContent;
