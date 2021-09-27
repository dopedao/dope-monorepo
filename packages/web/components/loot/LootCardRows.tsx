import { Bag } from '../../src/generated/graphql';
import { css } from '@emotion/react';
import { LootLegendBackgroundColors } from './LootLegend';
import ItemRarities from 'dope-metrics/output/item-rarities.json';

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

interface Props {
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
}

const LootCardRows = ({ bag }: Props) => {
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
          color={
            itemBackgroundColors[
              (ItemRarities as { [name: string]: any })[slot[1]]
            ] as string 
          }
          slot={slot[0]}
          item={slot[1]}
        />
      ))}
    </div>
  );
};
export default LootCardRows;