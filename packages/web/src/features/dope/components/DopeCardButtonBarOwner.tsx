/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/button';
import { usePaper } from 'hooks/contracts';
import { Dope } from 'generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PanelFooter from 'components/PanelFooter';
import { Box } from '@chakra-ui/react';
import { useIsOnEthereum } from 'hooks/web3';

import {
  TransferButton,
  SwapMeetButtonContainer,
  SellOrEditListingButton,
} from 'features/swap-meet/components';

import { NETWORK, ETH_CHAIN_ID, OPT_CHAIN_ID } from 'utils/constants';
const chainId = parseInt(ETH_CHAIN_ID);
// @ts-ignore
const contractAddress = NETWORK[chainId].contracts.dope;

type DopeCardButtonBarOwnerProps = {
  dope: Pick<Dope, 'id' | 'claimed' | 'opened'>;
};

const DopeCardButtonBarOwner = ({ dope }: DopeCardButtonBarOwnerProps) => {
  const paper = usePaper();
  const router = useRouter();
  const isOnEth = useIsOnEthereum();

  return (
    <>
      <SwapMeetButtonContainer>
        {/* {paper && !dope.claimed && (
        <Button
          onClick={async () => {
            if (!isOnEth) {
              alert('Please switch your network to Ethereum to claim $PAPER');
              return;
            }
            await paper.claimById(dope.id);
          }}
        >
          Claim $PAPER
        </Button>
      )} */}
        {!dope.opened && (
          <>
            {/* <Button onClick={() => router.push(`/dope/${dope.id}/unbundle`)} isDisabled={dope.opened}>
            Claim
          </Button> */}
            <Link href={`/hustlers/${dope.id}/initiate`} passHref>
              <Button variant="primary" isDisabled={dope.opened}>
                Mint Hustler
              </Button>
            </Link>
          </>
        )}
      </SwapMeetButtonContainer>
      <PanelFooter>
        <TransferButton
          title={`DOPE ${dope.id}`}
          chainId={chainId}
          contractAddress={contractAddress}
          tokenId={dope.id}
        />
        <SellOrEditListingButton
          chainId={chainId}
          contractAddress={contractAddress}
          tokenId={dope.id}
        />
      </PanelFooter>
    </>
  );
};
export default DopeCardButtonBarOwner;
