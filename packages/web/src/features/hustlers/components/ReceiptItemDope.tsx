import { HustlerCustomization } from "utils/HustlerConfig";
import { ReceiptItem, DopeLofi } from "./ReceiptItem";
import { Box, Image } from "@chakra-ui/react";
const ReceiptItemDope = ({dopeId}: {dopeId: string}) => {
  return(
    <ReceiptItem>
      <DopeLofi>
        • • • • • • • • •
      </DopeLofi>
      <Box flex="1">DOPE NFT #{dopeId}</Box>
      <Box>
        <Image
          src="/images/icon/ethereum.svg"
          width="16px"
          alt="This asset lives on Ethereum Mainnet"
        />
      </Box>
    </ReceiptItem>
  );
}

export default ReceiptItemDope;
