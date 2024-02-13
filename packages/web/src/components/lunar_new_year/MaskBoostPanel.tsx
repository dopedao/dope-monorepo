import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import { NETWORK, OPT_CHAIN_ID } from 'utils/constants';
import Link from 'next/link';
import { TransferSingleEvent } from '@dopewars/contracts/dist/SwapMeet';
import { useEffect, useCallback, useState } from 'react';
import { useHongbao } from 'hooks/contracts';
import { usePaper, useSwapMeet } from 'hooks/contracts';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import SpinnerMessage from 'components/SpinnerMessage';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { useBalance, useAccount } from 'wagmi';
import { BigNumberish } from 'ethers';
import { ethers } from 'ethers';

const Stats = styled.div`
  font-size: var(--text-smallest);
  margin: 1em 0;
  display: flex;
  align-items: space-between;
  & > div {
    flex: 1;
    white-space: nowrap;
  }
`;
const Divider = styled.hr`
  margin: 1em 0;
  border-top-width: 2px;
`;
const Bar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 1em;
`;
const Progress = styled.div`
  border: 2px solid black;
  border-radius: 4px;
  height: 32px;
  flex: 1;
  padding: 4px;
  div {
    display: block;
    border-radius: 2px;
    background-color: #e02514;
    height: 100%;
  }
`;

const BoostPanel = () => {
  const { address: account } = useAccount();
  const ethBalanceResult = useBalance({ address: account });
  const router = useRouter();

  const minBoosts = 0;
  const maxBoosts = 10;

  const [boosts, setBoosts] = useState(minBoosts);
  const [isApprovingPaper, setIsApprovingPaper] = useState(false);
  const [isPaperApproved, setIsPaperApproved] = useState(false);
  const [hasEnoughPaper, setHasEnoughPaper] = useState(false);
  const [isBuyingMask, setIsBuyingMask] = useState(false);

  // Roll is set to the mask item id purchased
  const [roll, setRoll] = useState<string | undefined>();
  const hongbao = useHongbao();
  const swapmeet = useSwapMeet();
  const paper = usePaper();

  const chainId = parseInt(OPT_CHAIN_ID);

  // Check ETH account balance
  const [ethBalance, setEthBalance] = useState<bigint>(0n);
  const [ethToSpend, setEthToSpend] = useState<number>();
  useEffect(() => {
    if (!ethBalanceResult.isSuccess) return;
    setEthBalance(ethBalanceResult.data?.value ?? 0n);
    const value = boosts === 1 ? (boosts + 0.00042) / 10 : boosts / 10;
    setEthToSpend(value);
  }, [ethBalanceResult, boosts]);

  const hasEnoughEthToMint = () => {
    if (!ethToSpend || ethToSpend === 0) return true;
    return ethBalance >= ethToSpend;
  };

  const mintMask = useCallback(async () => {
    try {
      setIsBuyingMask(true);
      const tx = await hongbao.mint({ value: ethToSpend, gasLimit: 300000 });
      const receipt = await tx.wait(1);
      receipt?.logs.map((log, idx) => {
        if (idx !== 0) return;

        const event = swapmeet.interface.parseLog(log) as unknown as TransferSingleEvent.Event;
        // Set roll to item id
        router.push(
          {
            pathname: '/lunar-new-year/mint-success',
            query: {
              items: JSON.stringify([
                {
                  typ: 1,
                  id: event.arguments.id.toString(),
                },
              ]),
            },
          },
          {
            pathname: '/lunar-new-year/mint-success',
          },
        );
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsBuyingMask(false);
    }
  }, [hongbao, swapmeet, ethToSpend, router]);

  // Check if PAPER spend approved for 5000
  useEffect(() => {
    async function effect() {
      if (account) {
        const hbAddress = await hongbao.getAddress();
        const allowance = await paper.allowance(account, hbAddress);
        const a = BigInt(allowance.toString());
        setIsPaperApproved(a >= 5000000000000000000000n);
      }
    }
    effect();
  }, [account, paper, hongbao]);

  // Check if has 5000 PAPER
  useEffect(() => {
    if (account) {
      paper.balanceOf(account).then((balance: BigNumberish) => {
        const b = BigInt(balance.toString());
        setHasEnoughPaper(b >= 5000000000000000000000n);
      });
    }
  }, [account, paper]);

  const approvePaper = async () => {
    try {
      setIsApprovingPaper(true);
      await paper.approve(await hongbao.getAddress(), ethers.MaxUint256);
      setIsPaperApproved(true);
    } finally {
      setIsApprovingPaper(false);
    }
  };

  const ethCost = () => {
    if (boosts === 1) {
      return boosts + 0.00042 / 10;
    }
    return boosts / 10;
  };
  const percentChance = () => {
    if (boosts === 0) return 0;
    return boosts * maxBoosts;
  };

  const subtractBoost = () => {
    let tempBoost = boosts;
    tempBoost--;
    if (minBoosts > tempBoost) tempBoost = minBoosts;
    setBoosts(tempBoost);
  };

  const addBoost = () => {
    let tempBoost = boosts;
    tempBoost++;
    if (tempBoost > maxBoosts) tempBoost = maxBoosts;
    setBoosts(tempBoost);
  };

  const getBoostImage = () => {
    const imgPrefix = '/images/lunar_new_year_2022/';
    switch (boosts) {
      case 0:
        return `${imgPrefix}tiger-mask-from-chinatown.png`;
      case 1:
      case 2:
      case 3:
      case 4:
        return `${imgPrefix}mask-roulette_2.gif`;
      case maxBoosts:
        return `${imgPrefix}golden-mask.png`;
      default:
        return `${imgPrefix}mask-roulette_3.gif`;
    }
  };

  return (
    <PanelContainer>
      <PanelTitleHeader>Good luck and big profit</PanelTitleHeader>
      <PanelBody>
        <Image src={getBoostImage()} alt="Your Prize Awaits" />
        <Stats>
          <Box
            css={css`
              display: flex;
              gap: 8px;
            `}
          >
            <Box>
              {boosts} BOOST{boosts === 1 ? '' : 'S'}
            </Box>
            <Box
              css={css`
                color: var(--gray-400);
              `}
            >
              ( {ethCost()}Ξ + $5000P )
            </Box>
          </Box>
          <Box
            css={css`
              text-align: right;
            `}
          >
            {boosts === maxBoosts && 'GOLDEN'}
            {boosts === 0 && 'TIGER MASK'}
            {boosts !== maxBoosts && boosts > 0 && <>{percentChance()}% ODDS</>}
          </Box>
        </Stats>
        <Divider />
        <Bar>
          <Button onClick={subtractBoost} isDisabled={boosts <= minBoosts}>
            <Image src="/images/icon/minus.svg" width="16px" alt="Subtract" />
          </Button>
          <Progress>
            <Box
              css={css`
                width: ${percentChance()}%;
              `}
            />
          </Progress>
          <Button onClick={addBoost} isDisabled={boosts >= maxBoosts}>
            <Image src="/images/icon/plus.svg" width="16px" alt="Add" />
          </Button>
        </Bar>
      </PanelBody>
      <PanelFooter stacked>
        {!hasEnoughPaper && (
          <Link
            href={
              'https://app.uniswap.org/#/swap?outputCurrency=0x00F932F0FE257456b32dedA4758922E56A4F4b42&inputCurrency=ETH&exactAmount=5000&exactField=output'
            }
            target="_blank"
            rel="noreferrer"
            passHref
          >
            <Button variant="cny">Buy $PAPER on Optimism</Button>
          </Link>
        )}
        {hasEnoughPaper && !isPaperApproved && (
          <Button variant="cny" onClick={approvePaper} disabled>
            {!isPaperApproved && !isApprovingPaper && <span>Approve $PAPER</span>}
            {!isPaperApproved && isApprovingPaper && <SpinnerMessage text="Approving…" />}
          </Button>
        )}
        <Button variant="cny" onClick={mintMask} disabled>
          {!isBuyingMask && hasEnoughEthToMint() && 'Complete Purchase'}
          {!isBuyingMask && !hasEnoughEthToMint() && 'Not Enough Optimistic ETH'}
          {isBuyingMask && (
            <SpinnerMessage text={boosts > 0 ? 'Rolling the dice…' : 'Processing…'} />
          )}
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default BoostPanel;
