import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { getProof } from 'utils/merkleproof';
import { Image } from '@chakra-ui/react';
import { OpenedEvent } from '@dopewars/contracts/dist/Hongbao';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHongbao } from 'hooks/contracts';
import { useAccount } from 'wagmi';
import config from 'config'; // Airdrop config
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import SpinnerMessage from 'components/SpinnerMessage';
import PanelTitleHeader from 'components/PanelTitleHeader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

const HongbaoPanel = () => {
  const hongbao = useHongbao();
  const { address: account } = useAccount();
  const router = useRouter();

  // if event.arguments.typ == 0
  //      PAPER reward. event.arguments.value is the numUnopenedEnvelopes
  // if event.arguments.typ == 1
  //      Item reward. event.arguments.value is the item id
  const [claimed, setClaimed] = useState<boolean>();
  const [isClaiming, setIsClaiming] = useState(false);

  const eligibleForAirdrop = Object.keys(config.airdrop).includes(account || '');
  const numUnopenedEnvelopes = useMemo(() => config.airdrop[account!], [account]);

  useEffect(() => {
    if (!eligibleForAirdrop) return;
    hongbao
      .claimed(
        Buffer.from(
          ethers
            .solidityPackedKeccak256(['address', 'uint256'], [account, numUnopenedEnvelopes])
            .slice(2),
          'hex',
        ),
      )
      .then(setClaimed);
  }, [eligibleForAirdrop, hongbao, account, numUnopenedEnvelopes]);

  const claim = useCallback(async () => {
    try {
      setIsClaiming(true);
      const proof = getProof(account!, numUnopenedEnvelopes.toString());
      const tx = await hongbao.claim(numUnopenedEnvelopes, proof, {
        gasLimit: 200000 + 100000 * numUnopenedEnvelopes,
      });
      const receipt = await tx.wait(1);

      const opens = receipt?.logs.reduce<{ typ: number; id: string }[]>((o, log, idx) => {
        if (idx % 2 === 0) return o;
        const event = hongbao.interface.parseLog({
          topics: Array.from(log.topics),
          data: log.data,
        }) as unknown as OpenedEvent.Event;
        // Set roll to item id
        return [...o, { typ: event.arguments.typ, id: event.arguments.id.toString() }];
      }, []);

      router.push(
        {
          pathname: '/lunar-new-year/mint-success',
          query: { items: JSON.stringify(opens) },
        },
        {
          pathname: '/lunar-new-year/mint-success',
        },
      );
    } finally {
      setIsClaiming(false);
    }
  }, [hongbao, account, numUnopenedEnvelopes, router]);

  return (
    <PanelContainer>
      {eligibleForAirdrop && (
        <>
          <PanelTitleHeader>
            {!claimed ? 'A gift for you' : 'All envelopes have been opened'}
          </PanelTitleHeader>
          <PanelBody>
            <Image
              src={`/images/lunar_new_year_2022/${
                claimed ? 'hongbao-with-bg.png' : 'hongbao_animated.gif'
              }`}
              alt="A surprise awaits you"
            />
          </PanelBody>
          <PanelFooter>
            {!claimed && (
              <Button variant="cny" onClick={claim} disabled>
                {!isClaiming && `Open ${numUnopenedEnvelopes} Envelopes`}
                {isClaiming && <SpinnerMessage text="Opening Envelopes…" />}
              </Button>
            )}
            {claimed && (
              <Link href="/swap-meet/inventory?section=Gear" passHref>
                <Button variant="cny">View your gifts</Button>
              </Link>
            )}
          </PanelFooter>
        </>
      )}
      {!eligibleForAirdrop && (
        <Box
          css={css`
            flex: 5;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 32px;
            background-color: #eee;
            text-align: center;
          `}
        >
          <Image src="/images/icon/dope-smiley-sad.svg" width="72px" alt="Frowney Face" />
          <br />
          <p>The connected wallet is not eligible for this airdrop.</p>
          <p>Purchase a rare accessory mask below!</p>
        </Box>
      )}
    </PanelContainer>
  );
};

export default HongbaoPanel;
