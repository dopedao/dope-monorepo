import { FC, ReactNode } from 'react';
import { AccordionButton, AccordionIcon } from '@chakra-ui/react';

type SectionHeaderProps = {
  children: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({ children }) => {
  return (
    <AccordionButton
      background="white"
      justifyContent="space-between"
      borderBottom="2px solid black"
      p={4}
      _focus={{ boxShadow: 'none' }}
      _hover={{ background: 'white' }}
    >
      {children}
      <AccordionIcon />
    </AccordionButton>
  );
};

export default SectionHeader;
