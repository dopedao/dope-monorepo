/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { Bag } from 'src/generated/graphql';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { BigNumber } from 'ethers';
import { NETWORK } from 'src/constants';
import { HustlerInitConfig } from 'src/HustlerConfig';
import { Paper__factory, Initiator__factory } from '@dopewars/contracts';

interface Props {
  bag: Pick<Bag, 'id' | 'claimed'>;
  toggleVisibility(): void;
}

const LootCardFooterForOwner = ({ bag, toggleVisibility }: Props) => {
  const { chainId, library, account } = useWeb3React();

  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();

  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();

  const paper = useMemo(
    () =>
      chainId
        ? Paper__factory.connect(NETWORK[chainId as 1 | 42].contracts.paper, library.getSigner())
        : null,
    [chainId, library],
  );

  const initiator = useMemo(
    () =>
      chainId
        ? Initiator__factory.connect(
            NETWORK[chainId as 42].contracts.initiator,
            library.getSigner(),
          )
        : null,
    [chainId, library],
  );

  useEffect(() => {
    if (account && paper) {
      paper
        .balanceOf(account)
        .then(balance => setHasEnoughPaper(balance.gt('12500000000000000000000')));
    }
  }, [account, paper]);

  useEffect(() => {
    if (account && paper) {
      paper
        .allowance(account, NETWORK[chainId as 42].contracts.initiator)
        .then((allowance: BigNumber) =>
          setIsPaperApproved(allowance.gte('12500000000000000000000')),
        );
    }
  }, [account, chainId, paper]);

  const router = useRouter();
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const initiateHustler = () => {
    hustlerConfig.dopeId = bag.id;
    HustlerInitConfig(hustlerConfig);
    router.push('/hustlers/initiate');
  };

  return (
    <div>
      {chainId == 42 && initiator && paper && account && (
        <>
          <Button variant="primary" onClick={() => initiateHustler()}>
            Initiate Hustler
          </Button>
          <Button
            onClick={async () => {
              await initiator.open(bag.id, account, '0x', 500000);
            }}
          >
            Unbundle
          </Button>
        </>
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
