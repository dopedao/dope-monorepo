import { Button } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { getProof } from 'utils/merkleproof';
import config from 'config'; // Airdrop config
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import { Hongbao } from '@dopewars/contracts/dist';

import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import { useHongbao } from 'hooks/contracts';

const HongbaoPanel = () => {
  const hongbao = useHongbao();
  const { account } = useWeb3React();

  const amount = useMemo(() => config.airdrop[account!].toString(), [account]);
  const claim = useCallback(async () => {
    const proof = getProof(account!, amount);
    const tx = await hongbao.claim(amount, proof);
    const receipt = await tx.wait();
    receipt.logs.map((log, idx, array) => {
      debugger;
    });
  }, [hongbao, account, amount]);

  return (
    <PanelContainer>
      <PanelBody>
        <Image src="/images/lunar_new_year_2022/hongbao-with-bg.png" alt="A surprise awaits you" />
      </PanelBody>
      <PanelFooter>
        <Button variant="cny" onClick={claim}>
          Open {amount} Envelopes
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default HongbaoPanel;
