import { FC, ReactNode } from 'react';
import { AccordionButton, AccordionIcon } from '@chakra-ui/react';

type SectionHeaderProps = {
  children: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({ children }) => {
  return (
    <AccordionButton justifyContent="space-between" p={4} _focus={{ boxShadow: 'none' }}>
      {children}
      <AccordionIcon />
    </AccordionButton>
  );
};

export default SectionHeader;
