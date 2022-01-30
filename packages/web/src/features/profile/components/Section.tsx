import { FC, ReactNode } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

type SectionProps = {
  children: ReactNode
  title: string
}

const Section: FC<SectionProps> = ({
  children,
  title,
}) => {
  return (
    <AccordionItem border="1px">
      <AccordionButton
        justifyContent="space-between"
        p={4}
        _focus={{ boxShadow: "none" }}
      >
        {title}
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default Section
