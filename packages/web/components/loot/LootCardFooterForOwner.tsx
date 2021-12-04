/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { Bag } from 'src/generated/graphql';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { BigNumber } from 'ethers';
import { HustlerInitConfig } from 'src/HustlerConfig';
import { useInitiator, usePaper } from 'hooks/contracts';

interface Props {
  bag: Pick<Bag, 'id' | 'claimed'>;
  toggleVisibility(): void;
}

const LootCardFooterForOwner = ({ bag, toggleVisibility }: Props) => {
  const { chainId, account } = useWeb3React();

  const paper = usePaper();
  const initiator = useInitiator();

  const router = useRouter();
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const initiateHustler = () => {
    hustlerConfig.dopeId = bag.id;
    HustlerInitConfig(hustlerConfig);
    router.push('/hustlers/initiate');
  };

  return (
    <div>
      <Button variant="primary" onClick={() => initiateHustler()}>
        Initiate Hustler
      </Button>
      {initiator && paper && account && chainId === 42 && (
        <Button onClick={() => router.push(`/loot/${bag.id}/unbundle`)}>Unbundle</Button>
      )}
      {paper && (
        <Button
          disabled={bag.claimed}
          onClick={async () => {
            await paper.claimById(bag.id);
          }}
        >
          Claim Paper
        </Button>
      )}
      <div
        css={css`
          float: right;
          cursor: pointer;
          padding: 4px;
        `}
        onClick={() => toggleVisibility()}
      >
        <img
          src="/images/icon/info.svg"
          width="24"
          height="24"
          css={css`
            display: inline-block;
          `}
          alt="info"
        />
      </div>
    </div>
  );
};
export default LootCardFooterForOwner;
