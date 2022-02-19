import { FC, ReactNode } from 'react';
import { AccordionItem } from '@chakra-ui/react';

type SectionProps = {
  children: ReactNode;
};

const Section: FC<SectionProps> = ({ children }) => {
  return <AccordionItem borderBottom="0">{children}</AccordionItem>;
};

export default Section;
