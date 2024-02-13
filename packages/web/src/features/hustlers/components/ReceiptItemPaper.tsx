import { BigNumberish, ethers } from 'ethers';
import { Box, Image } from '@chakra-ui/react';
import { ReceiptItem } from './ReceiptItem';

const ReceiptItemPaper = ({
  amount,
  hideUnderline,
}: {
  amount: BigNumberish | undefined;
  hideUnderline?: boolean;
}) => {
  return (
    <ReceiptItem hideUnderline={hideUnderline}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Image src="/images/icon/wallet.svg" alt="Wallet" />
      </Box>
      <Box flex="1">
        {amount &&
          parseInt(ethers.formatEther(amount), 10).toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
        {!amount && '…'}
        &nbsp; $PAPER
      </Box>
      <Box>
        <Image
          src="/images/icon/ethereum.svg"
          width="16px"
          alt="This asset lives on Ethereum Mainnet"
        />
      </Box>
    </ReceiptItem>
  );
};
export default ReceiptItemPaper;
