import { Box } from '@chakra-ui/layout';
import { Collapse } from '@chakra-ui/transition';
import { FC, useState } from 'react';
import CollapseArrowsClosed from 'ui/svg/CollapseArrowsClosed';
import CollapseArrowsOpen from 'ui/svg/CollapseArrowsOpen';
import { Wrapper, Header } from './styles';

type AccordionProps = { title: string; isOpen?: boolean };

const Accordion: FC<AccordionProps> = ({ title, children, isOpen = true }) => {
  const [show, setShow] = useState(isOpen);

  const handleToggle = () => setShow(!show);

  return (
    <Wrapper>
      <Header onClick={handleToggle}>
        <h4>{title}</h4>
        {show ? <CollapseArrowsClosed /> : <CollapseArrowsOpen />}
      </Header>
      <Collapse in={show} animateOpacity>
        <Box paddingY="18px" paddingX="12px" color="white" bg="whiteAlpha.900" overflow="scroll">
          {children}
        </Box>
      </Collapse>
    </Wrapper>
  );
};

export default Accordion;
