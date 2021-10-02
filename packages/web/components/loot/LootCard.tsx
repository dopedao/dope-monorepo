import { Bag } from '../../src/generated/graphql';
import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { NETWORK } from '../../common/constants';
import { Paper__factory, Stockpile__factory } from '@dopewars/contracts';
import { useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import ItemRarities from 'dope-metrics/output/item-rarities.json';
import LootLegend, { LootLegendBackgroundColors } from './LootLegend';
import styled from '@emotion/styled';

const itemBackgroundColors = Object.values(LootLegendBackgroundColors);

const betterItemName = (name: string) => {
  const quotedIndex = name.lastIndexOf('"');
  if (quotedIndex !== -1) {
    const modifier = name.substr(0, quotedIndex + 1);
    const itemName = name.substr(quotedIndex + 1);
    return (
      <>
        <span
          css={css`
            margin-left: -0.9em;
            display: inline;
            font-size: 1.1em;
          `}
        >
          {modifier}
        </span>
        <br />
        <span
          css={css`
            display: inline;
            margin-top: 0.6em;
          `}
        >
          {itemName}
        </span>
      </>
    );
  }
  return name;
};

const Row = ({ color, slot, item }: { color: string; slot: string; item: string }) => (
  <div
    css={css`
      width: 100%;
      display: flex;
      border-bottom: 1px solid #dededd;
      div {
        padding: 12px 12px;
      }
    `}
  >
    <div
      css={css`
        color: rgb(26, 32, 44);
        width: 33%;
        text-align: right;
        border-right: 1px solid #dededd;
      `}
    >
      {slot}
    </div>
    <div
      css={css`
        width: 66%;
      `}
    >
      <span
        css={css`
          background-color: ${color};
          padding: 2px 4px;
          color: #000;
        `}
      >
        {betterItemName(item)}
      </span>
    </div>
  </div>
);

const LootCardContainer = styled.div`
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const LootTitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 32px;
  background: #dededd;
  border-bottom: 2px solid #000;
  box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);
  font-size: var(--text-00);
  position: 'sticky';
`;
const LootFooter = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  background: #dededd;
  border-top: 2px solid #000;
  padding: 0 8px;
  div {
    flex-grow: 1;
  }
  * > button {
    margin-right: 10px;
  }
`;

const LootCard = ({
  bag,
}: {
  bag: Pick<
    Bag,
    | 'id'
    | 'clothes'
    | 'drugs'
    | 'foot'
    | 'hand'
    | 'neck'
    | 'ring'
    | 'vehicle'
    | 'waist'
    | 'weapon'
    | 'claimed'
  >;
}) => {
  const { chainId, library } = useWeb3React();
  const [isItemLegendVisible, setIsItemLegendVisible] = useState(false);

  const toggleItemLegendVisibility = (): void => {
    setIsItemLegendVisible(!isItemLegendVisible);
  };

  const paper = useMemo(
    () =>
      chainId
        ? Paper__factory.connect(NETWORK[chainId as 1 | 4].contracts.paper, library.getSigner())
        : null,
    [chainId],
  );
  const stockpile = useMemo(
    () =>
      chainId
        ? Stockpile__factory.connect(
            NETWORK[chainId as 1 | 4].contracts.stockpile,
            library.getSigner(),
          )
        : null,
    [chainId],
  );

  const LootRows = () => {
    return (
      <div
        css={css`
          flex: 1;
          background: #fff;
          padding-top: 0px;
          overflow-y: auto;
        `}
      >
        {[
          ['Weapon', bag.weapon],
          ['Vehicle', bag.vehicle],
          ['Drug', bag.drugs],
          ['Neck', bag.neck],
          ['Clothes', bag.clothes],
          ['Hands', bag.hand],
          ['Waist', bag.waist],
          ['Feet', bag.foot],
          ['Ring', bag.ring],
        ].map(slot => (
          <Row
            key={slot[0]}
            color={itemBackgroundColors[(ItemRarities as { [name: string]: any })[slot[1]]]}
            slot={slot[0]}
            item={slot[1]}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {isItemLegendVisible && <LootLegend toggleVisibility={toggleItemLegendVisibility} />}
      {!isItemLegendVisible && (
        <LootCardContainer>
          <LootTitleBar>
            <div>Dope Wars Loot #{bag.id}</div>
          </LootTitleBar>
          <LootRows />
          <LootFooter>
            <div>
              <Button
                disabled={bag.claimed}
                onClick={async () => {
                  await paper.claimById(bag.id);
                }}
              >
                Claim Paper
              </Button>
              <Button
                disabled={chainId == 1}
                onClick={async () => {
                  await stockpile.open(bag.id);
                }}
              >
                Unbundle
              </Button>
            </div>
            <div
              css={css`
                text-align: right;
                cursor: pointer;
              `}
              onClick={() => toggleItemLegendVisibility()}
            >
              <img
                src="/images/icon/info.svg"
                width="24"
                height="24"
                css={css`
                  display: inline-block;
                  margin-left: 8px;
                `}
              />
            </div>
          </LootFooter>
        </LootCardContainer>
      )}
    </>
  );
};

export default LootCard;
