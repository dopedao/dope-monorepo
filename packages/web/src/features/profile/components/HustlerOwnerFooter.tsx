import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import {
  SwapMeetButtonContainer,
  TransferButton,
  SellOrEditListingButton,
} from 'features/swap-meet/components';
import PanelFooter from 'components/PanelFooter';

type Props = {
  tokenId: string;
  chainId: number;
  contractAddress: string;
  title: string;
};

const HustlerOwnerFooter = ({ tokenId, chainId, contractAddress, title }: Props) => (
  <>
    <SwapMeetButtonContainer>
      <Link href={`/hustlers/${tokenId}`} passHref>
        <Button>Details</Button>
      </Link>
      <Link href={`/hustlers/${tokenId}/customize`} passHref>
        <Button>Customize</Button>
      </Link>
    </SwapMeetButtonContainer>
    <PanelFooter>
      <TransferButton
        chainId={chainId}
        contractAddress={contractAddress}
        tokenId={tokenId}
        title={title}
      />
      <SellOrEditListingButton
        chainId={chainId}
        contractAddress={contractAddress}
        tokenId={tokenId}
      />
    </PanelFooter>
  </>
);
export default HustlerOwnerFooter;
