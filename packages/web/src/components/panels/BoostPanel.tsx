import { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BigNumber, utils } from 'ethers';

import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import { useHongbao } from 'hooks/contracts';

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
  const minBoosts = 0;
  const maxBoosts = 10;

  const [boosts, setBoost] = useState(minBoosts);
  const hongbao = useHongbao();

  const mint = useCallback(() => {
    hongbao.mint({ value: utils.parseEther('' + boosts / 10) });
  }, [hongbao, boosts]);

  const ethCost = () => (boosts * 1) / 10;
  const percentChance = () => {
    if (boosts == 0) {
      return 1;
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
        return imgPrefix + 'hongbao-with-bg.png';
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
      <PanelBody>
        <Image src={getBoostImage()} alt="Hello" />
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
              ( {ethCost()} Ξ + $5000P )
            </div>
          </div>
          <div
            css={css`
              text-align: right;
            `}
          >
            {boosts === maxBoosts && <>GUARANTEED RARE</>}
            {boosts !== maxBoosts && <>{percentChance()}% ODDS</>}
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
        <Button variant="cny" onClick={mint}>
          Buy Now
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default BoostPanel;
