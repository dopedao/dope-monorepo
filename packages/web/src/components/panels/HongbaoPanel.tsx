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
  //      PAPER reward. event.args.value is the amount
  // if event.args.typ == 1
  //      Item reward. event.args.value is the item id
  const [opens, setOpens] = useState<OpenedEvent[]>();
  const [claimed, setClaimed] = useState<boolean>();

  const amount = useMemo(() => config.airdrop[account!].toString(), [account]);
  useEffect(() => {
    hongbao
      .claimed(
        Buffer.from(solidityKeccak256(['address', 'uint256'], [account, amount]).slice(2), 'hex'),
      )
      .then(setClaimed);
  }, [hongbao, account, amount]);
  const claim = useCallback(async () => {
    const proof = getProof(account!, amount);
    const tx = await hongbao.claim(amount, proof);
    const receipt = await tx.wait();
    setOpens(
      receipt.logs.reduce<OpenedEvent[]>((o, log, idx) => {
        if (idx % 2 == 0) return o;
        const event = hongbao.interface.parseLog(log) as unknown as OpenedEvent;
        // Set roll to item id
        return [...o, event];
      }, []),
    );
  }, [hongbao, account, amount, setOpens]);

  return (
    <PanelContainer>
      <PanelBody>
        <Image src="/images/lunar_new_year_2022/hongbao-with-bg.png" alt="A surprise awaits you" />
      </PanelBody>
      <PanelFooter>
        <Button variant="cny" onClick={claim} disabled={claimed}>
          {claimed ? 'Already Claimed!' : `Open ${amount} Envelopes`}
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default HongbaoPanel;
