import { Button } from '@chakra-ui/react';
import { BigNumber, constants, utils } from 'ethers';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import { NETWORK } from 'utils/constants';
import Link from 'next/link';
import { TransferSingleEvent } from '@dopewars/contracts/dist/SwapMeet';
import { useEffect, useCallback, useState } from 'react';
import { useHongbao } from 'hooks/contracts';
import { useOptimism } from 'hooks/web3';
import { usePaper, useSwapMeet } from 'hooks/contracts';
import { useWeb3React } from '@web3-react/core';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleBar from 'components/PanelTitleBar';
import SpinnerMessage from 'components/SpinnerMessage';
import styled from '@emotion/styled';

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
  const { account } = useWeb3React();

  const minBoosts = 0;
  const maxBoosts = 10;

  const [boosts, setBoost] = useState(minBoosts);
  const [isApprovingPaper, setIsApprovingPaper] = useState(false);
  const [isPaperApproved, setIsPaperApproved] = useState(false);
  const [hasEnoughPaper, setHasEnoughPaper] = useState(false);
  const [isBuyingMask, setIsBuyingMask] = useState(false);

  // Roll is set to the item id
  const [roll, setRoll] = useState<string | undefined>();
  const hongbao = useHongbao();
  const swapmeet = useSwapMeet();
  const paper = usePaper();
  const { chainId } = useOptimism();

  const mint = useCallback(async () => {
    const tx = await hongbao.mint({ value: utils.parseEther('' + boosts / 10) });
    const receipt = await tx.wait(1);
    receipt.logs.map((log, idx) => {
      if (idx !== 0) return;
      const event = swapmeet.interface.parseLog(log) as unknown as TransferSingleEvent;
      // Set roll to item id
      setRoll(event.args.id.toString());
    });
  }, [hongbao, swapmeet, boosts]);

  // Check if PAPER spend approved for 5000
  useEffect(() => {
    if (account) {
      paper.allowance(account, NETWORK[chainId].contracts.hongbao).then((allowance: BigNumber) => {
        console.log(`$P approval allowance: ${allowance}`);
        setIsPaperApproved(allowance.gte('500000000000000000000'));
      });
    }
  }, [account, paper, chainId]);

  // Check if has 5000 PAPER
  useEffect(() => {
    if (account) {
      paper.balanceOf(account).then((balance: BigNumber) => {
        setHasEnoughPaper(balance.gte('500000000000000000000'));
      });
    }
  }, [account, paper, chainId, roll]);

  const approvePaper = async () => {
    try {
      setIsApprovingPaper(true);
      const txn = await paper.approve(NETWORK[chainId].contracts.hongbao, constants.MaxUint256);
      await txn.wait(1);
      setIsPaperApproved(true);
    } finally {
      setIsApprovingPaper(false);
    }
  };

  const ethCost = () => (boosts * 1) / 10;
  const percentChance = () => {
    if (boosts == 0) {
      return 0;
    } else {
      return boosts * maxBoosts;
    }
  };

  const subtractBoost = () => {
    let tempBoost = boosts;
    tempBoost--;
    if (minBoosts > tempBoost) tempBoost = minBoosts;
    setBoost(tempBoost);
  };

  const addBoost = () => {
    let tempBoost = boosts;
    tempBoost++;
    if (tempBoost > maxBoosts) tempBoost = maxBoosts;
    setBoost(tempBoost);
  };

  const getBoostImage = () => {
    const imgPrefix = '/images/lunar_new_year_2022/';
    let imgPath;
    switch (boosts) {
      case 0:
        return imgPrefix + 'tiger-mask-from-chinatown.png';
      case 1:
      case 2:
      case 3:
      case 4:
        return imgPrefix + 'mask-roulette_2.gif';
      case maxBoosts:
        return imgPrefix + 'golden-mask.png';
      default:
        return imgPrefix + 'mask-roulette_3.gif';
    }
  };

  return (
    <PanelContainer>
      <PanelTitleBar centered>Good luck and big profit</PanelTitleBar>
      <PanelBody>
        <Image src={getBoostImage()} alt="Your Prize Awaits" />
        <Stats>
          <div
            css={css`
              display: flex;
              gap: 8px;
            `}
          >
            <div>
              {boosts} BOOST{boosts == 1 ? '' : 'S'}
            </div>
            <div
              css={css`
                color: var(--gray-400);
              `}
            >
              ( {ethCost()}Ξ + $5000P )
            </div>
          </div>
          <div
            css={css`
              text-align: right;
            `}
          >
            {boosts === maxBoosts && <>GOLDEN</>}
            {boosts === 0 && <>TIGER MASK</>}
            {boosts !== maxBoosts && boosts > 0 && <>{percentChance()}% ODDS</>}
          </div>
        </Stats>
        <Divider />
        <Bar>
          <Button onClick={subtractBoost} disabled={boosts <= minBoosts}>
            <Image src="/images/icon/minus.svg" width="16px" alt="Subtract" />
          </Button>
          <Progress>
            <div
              css={css`
                width: ${percentChance()}%;
              `}
            />
          </Progress>
          <Button onClick={addBoost} disabled={boosts >= maxBoosts}>
            <Image src="/images/icon/plus.svg" width="16px" alt="Add" />
          </Button>
        </Bar>
      </PanelBody>
      <PanelFooter>
        {!hasEnoughPaper && (
          <Link
            href={`https://app.uniswap.org/#/swap?outputCurrency=0x00F932F0FE257456b32dedA4758922E56A4F4b42&inputCurrency=ETH&exactAmount=5000&exactField=output`}
            passHref
          >
            <a target="_blank" rel="noreferrer">
              <Button variant="cny">Buy Paper</Button>
            </a>
          </Link>
        )}
        {hasEnoughPaper && !isPaperApproved && (
          <Button
            variant="cny"
            onClick={approvePaper}
            disabled={isApprovingPaper || isPaperApproved}
          >
            {!isPaperApproved && !isApprovingPaper && <span>Approve Paper</span>}
            {!isPaperApproved && isApprovingPaper && <SpinnerMessage text="Approving…" />}
          </Button>
        )}
        <Button variant="cny" onClick={mint} disabled={!isPaperApproved}>
          Buy Now
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default BoostPanel;
