import { Button } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getProof } from 'utils/merkleproof';
import config from 'config'; // Airdrop config
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import { OpenedEvent } from '@dopewars/contracts/dist/Hongbao';
import { solidityKeccak256 } from 'ethers/lib/utils';

import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import { useHongbao } from 'hooks/contracts';

const HongbaoPanel = () => {
  const hongbao = useHongbao();
  const { account } = useWeb3React();

  // if event.args.typ == 0
  //      PAPER reward. event.args.value is the numUnopenedEnvelopes
  // if event.args.typ == 1
  //      Item reward. event.args.value is the item id
  const [opens, setOpens] = useState<OpenedEvent[]>();
  const [claimed, setClaimed] = useState<boolean>();

  const eligibleForAirdrop = Object.keys(config.airdrop).includes(account || '');
  const numUnopenedEnvelopes = useMemo(() => config.airdrop[account!], [account]);

  useEffect(() => {
    if (!eligibleForAirdrop) return;
    hongbao
      .claimed(
        Buffer.from(solidityKeccak256(['address', 'uint256'], [account, numUnopenedEnvelopes]).slice(2), 'hex'),
      )
      .then(setClaimed);
  }, [hongbao, account, numUnopenedEnvelopes]);

  const claim = useCallback(async () => {
    const proof = getProof(account!, numUnopenedEnvelopes.toString());
    const tx = await hongbao.claim(numUnopenedEnvelopes, proof);
    const receipt = await tx.wait();
    setOpens(
      receipt.logs.reduce<OpenedEvent[]>((o, log, idx) => {
        if (idx % 2 == 0) return o;
        const event = hongbao.interface.parseLog(log) as unknown as OpenedEvent;
        // Set roll to item id
        return [...o, event];
      }, []),
    );
  }, [hongbao, account, numUnopenedEnvelopes, setOpens]);

  return (
    <PanelContainer>
      { eligibleForAirdrop && <>
        <PanelBody>
          <Image 
            src="/images/lunar_new_year_2022/hongbao-with-bg.png" 
            alt="A surprise awaits you" 
          />
        </PanelBody>
        <PanelFooter>
          <Button variant="cny" onClick={claim} disabled={claimed}>
            {claimed ? 'Already Claimed!' : `Open ${numUnopenedEnvelopes} Envelopes`}
          </Button>
        </PanelFooter>
        </>
      }
      { !eligibleForAirdrop &&
        <div css={css`
          flex: 5;
          height: 100%;
          display:flex;
          flex-direction: column;
          align-items:center;
          justify-content: center;
          padding:32px;
          background-color:#eee;
          text-align: center;
        `}>
          <Image src="/images/icon/dope-smiley-sad.svg" width="72px" alt="Frowney Face" />
          <br/>
          <p>
            The connected wallet is not eligible for this airdrop.
          </p>
          <p>
            Purchase a rare accessory mask below!
          </p>
        </div>
      }
    </PanelContainer>
  );
};

export default HongbaoPanel;
