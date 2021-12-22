import { css } from '@emotion/react';
import { DopeLegendBackgroundColors } from 'components/dope/DopeLegend';
// import ItemRarities from 'dope-metrics/output/item-rarities.json';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import { DopeCardProps } from './DopeCard';

// const itemBackgroundColors = Object.values(DopeLegendBackgroundColors);

const betterItemName = (name = '') => {
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

const Row = ({ color = '#fff', slot, item }: { color?: string; slot: string; item: string }) => (
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
        white-space: nowrap;
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

const DopeCardBody = ({ dope }: Pick<DopeCardProps, 'dope'>) => {
  return (
    <div
      className="dopeCardBody"
      css={css`
        flex: 1;
        background: #fff;
        padding-top: 0px;
        overflow-y: auto;
      `}
    >
      <Row key="rank" slot="Rank" item={`${dope.rank} / ${NUM_DOPE_TOKENS}`} />

      {/* PAPER */}
      {!dope.claimed && <Row key="paper" slot="$PAPER" item="✅ 125,000 Claimable ✅" />}
      {dope.claimed && <Row key="paper" slot="$PAPER" item="🚫 Claimed 🚫" />}

      {!dope.opened && <Row key="bundled" slot="Bundled" item="✅ Ready to Unpack ✅" />}
      {dope.opened && <Row key="bundled" slot="Bundled" item="🚫 Unpacked 🚫" />}

      {/* {[
        ['Weapon', dope.weapon],
        ['Vehicle', dope.vehicle],
        ['Drug', dope.drugs],
        ['Neck', dope.neck],
        ['Clothes', dope.clothes],
        ['Hands', dope.hand],
        ['Waist', dope.waist],
        ['Feet', dope.foot],
        ['Ring', dope.ring],
      ].map(slot => (
        <Row
          key={slot[0]}
          color={itemBackgroundColors[(ItemRarities as { [name: string]: any })[slot[1]]] as string}
          slot={slot[0]}
          item={slot[1]}
        />
      ))} */}
    </div>
  );
};
export default DopeCardBody;
