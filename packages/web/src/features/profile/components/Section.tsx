import { FC, ReactNode } from "react"
import { AccordionItem } from '@chakra-ui/react'

type SectionProps = {
  children: ReactNode
}

const Section: FC<SectionProps> = ({
  children,
}) => {
  return (
    <AccordionItem borderBottom="2px">
      {children}
    </AccordionItem>
  )
}

export default Section
