import { useRouter } from 'next/router';
import { Bag } from '../../src/generated/graphql';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { BigNumber, constants } from 'ethers';
import { NETWORK } from '../../src/constants';
import { HustlerInitConfig } from '../../src/HustlerInitiation';
import { useReactiveVar } from '@apollo/client';
import {
  Paper,
  Paper__factory,
  SwapMeet__factory,
  Hustler__factory,
  Loot__factory,
} from '@dopewars/contracts';
import { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

interface Props {
  bag: Pick<Bag, 'id' | 'claimed'>;
  toggleVisibility(): void;
}

const LootCardFooterForOwner = ({ bag, toggleVisibility }: Props) => {
  const { chainId, library, account } = useWeb3React();

  const [hasEnoughPaper, setHasEnoughPaper] = useState<boolean>();

  const [isDopeApproved, setIsDopeApproved] = useState<boolean>();
  const [isPaperApproved, setIsPaperApproved] = useState<boolean>();

  const paper = useMemo(
    () =>
      chainId
        ? Paper__factory.connect(NETWORK[chainId as 1 | 4].contracts.paper, library.getSigner())
        : null,
    [chainId],
  );

  const dope = useMemo(
    () =>
      chainId
        ? Loot__factory.connect(NETWORK[chainId as 1 | 4].contracts.dope, library.getSigner())
        : null,
    [chainId],
  );

  const swapmeet = useMemo(
    () =>
      chainId
        ? SwapMeet__factory.connect(
            NETWORK[chainId as 1 | 4].contracts.swapmeet,
            library.getSigner(),
          )
        : null,
    [chainId],
  );

  const hustlers = useMemo(
    () =>
      chainId
        ? Hustler__factory.connect(
            NETWORK[chainId as 1 | 4].contracts.hustlers,
            library.getSigner(),
          )
        : null,
    [chainId],
  );

  useEffect(() => {
    if (account && paper) {
      paper
        .balanceOf(account)
        .then(balance => setHasEnoughPaper(balance.gt('12500000000000000000000')));
    }
  }, [account, paper]);

  useEffect(() => {
    if (account && dope) {
      dope
        .isApprovedForAll(account, NETWORK[chainId as 1 | 4].contracts.hustlers)
        .then(setIsDopeApproved);
    }
  }, [account, dope]);

  useEffect(() => {
    if (account && paper) {
      paper
        .allowance(account, NETWORK[chainId as 1 | 4].contracts.hustlers)
        .then((allowance: BigNumber) =>
          setIsPaperApproved(allowance.gte('12500000000000000000000')),
        );
    }
  }, [account, paper]);

  const router = useRouter();
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const initiateHustler = () => {
    hustlerConfig.dopeId = bag.id;
    HustlerInitConfig(hustlerConfig);
    router.push('/hustlers/initiate');
  };

  return (
    <div>
      {chainId == 4 && swapmeet && paper && account && (
        <>
          {/* <Button
            disabled={isPaperApproved}
            onClick={async () => {
              await paper.increaseAllowance(
                NETWORK[chainId as 1 | 4].contracts.hustlers,
                constants.MaxUint256,
              );
            }}
          >
            Approve Paper
          </Button>
          <Button
            disabled={isDopeApproved}
            onClick={async () => {
              await dope.setApprovalForAll(NETWORK[chainId as 1 | 4].contracts.hustlers, true);
            }}
          >
            Approve Dope
          </Button>
          <Button
            onClick={async () => {
              await hustlers.mintFromDope(bag.id, 'name', '0xffffffff', '0x000000ff', '0x');
            }}
          >
            Mint Hustler
          </Button>
          <Button
            onClick={async () => {
              await hustlers.mintOGFromDope(bag.id, 'name', '0xffffffff', '0x000000ff', '0x', {
                value: '330000000000000000',
              });
            }}
          >
            Mint Original Gangsta
          </Button> */}
          <Button variant="primary" onClick={() => initiateHustler()}>
            Initiate Hustler
          </Button>
          <Button
            onClick={async () => {
              await swapmeet.open(bag.id, account, '');
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
        />
      </div>
    </div>
  );
};
export default LootCardFooterForOwner;
