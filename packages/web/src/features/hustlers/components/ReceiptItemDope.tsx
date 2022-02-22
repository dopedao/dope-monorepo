import { HustlerCustomization } from "utils/HustlerConfig";
import { ReceiptItem, DopeLofi } from "./ReceiptItem";
import { Box, Image } from "@chakra-ui/react";
const ReceiptItemDope = ({hustlerConfig}: {hustlerConfig: HustlerCustomization;}) => {
  return(
    <ReceiptItem>
      <DopeLofi>
        • • • • • • • • •
      </DopeLofi>
      <Box flex="1">DOPE NFT #{hustlerConfig.dopeId}</Box>
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
