import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { Image } from "@chakra-ui/react";
import { useState } from "react";
import PanelBody from "components/PanelBody";
import PanelContainer from "components/PanelContainer";
import PanelFooter from "components/PanelFooter";
import styled from "@emotion/styled";
import { e } from "gear-rarity/dist/image-140bf8ec";

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
`
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
    background-color: #E02514;
    height: 100%;
  }
`;

const BoostPanel = () => {
  const minBoosts = 0;
  const maxBoosts = 10;

  const [boosts, setBoost] = useState(minBoosts);

  const ethCost = () => (boosts * 1) / 10;
  const percentChance = () => {
    if (boosts == 0) {
      return 1;
    } else {
      return (boosts * maxBoosts);
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
    if (boosts == 0) {
      imgPath = imgPrefix + 'hongbao-with-bg.png';
    } else if (boosts == maxBoosts) {
      imgPath = imgPrefix + 'golden-mask-black.png';
    } else {
      imgPath = imgPrefix + 'mask-roulette_3.gif';
    };
    return imgPath;
  };
  
  return(
    <PanelContainer>
      <PanelBody>
        <Image src={ getBoostImage() } alt="Hello" />
        <Stats>
          <div css={css`display:flex;gap:8px;`}>
            <div>{ boosts } BOOST{ boosts == 1 ? '' : 'S' }</div>
            <div css={css`color:var(--gray-400)`}>( { ethCost() } Ξ )</div>
          </div>
          <div css={css`text-align:right;`}>
            { boosts === maxBoosts && <>GUARANTEED RARE</> }
            { boosts !== maxBoosts && <>{ percentChance() }% ODDS</> }
          </div>
        </Stats>
        <Divider />
        <Bar>
          <Button onClick={subtractBoost} disabled={ boosts <= minBoosts }>
            <Image src="/images/icon/minus.svg" width="16px" alt="Subtract" />
          </Button>
          <Progress>
            <div css={css`width:${percentChance()}%`} />
          </Progress>
          <Button onClick={addBoost} disabled={ boosts >= maxBoosts }>
            <Image src="/images/icon/plus.svg" width="16px" alt="Add" />
          </Button>
        </Bar>
      </PanelBody>
      <PanelFooter>
        <Button variant="cny" disabled>
          { boosts === 0 ? 'Open' : 'Buy' } Now
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default BoostPanel;
