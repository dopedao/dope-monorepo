import { ReceiptItem } from "./ReceiptItem";
import { Box, Image } from "@chakra-ui/react";

const ReceiptItemGear = ({hideUnderline}: {hideUnderline?: boolean}) => {
  return(
    <ReceiptItem hideUnderline={hideUnderline}>
      <Box display="flex" alignItems="center" justifyContent="center" background="var(--gray-100)" color="black" borderRadius="4px">9</Box>
      <Box flex="1">DOPE Gear NFTs</Box>
      <Box>
        <Image
          src="/images/icon/optimism.svg"
          width="16px"
          alt="This asset lives on Optimism"
        />
      </Box>
    </ReceiptItem>
  )
}

export default ReceiptItemGear;
