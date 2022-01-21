import { css } from '@emotion/react';
import { DopeLegendBackgroundColors } from 'features/dope/components/DopeLegend';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import { DopeCardProps } from './DopeCard';
import Row from 'features/dope/components/Row';

const ITEM_ORDER = [
  'WEAPON',
  'VEHICLE',
  'DRUGS',
  'CLOTHES',
  'HAND',
  'WAIST',
  'FOOT',
  'NECK',
  'RING',
];

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
      <Row title="Rank" value={`${dope.rank + 1} / ${NUM_DOPE_TOKENS}`} />
      {/* PAPER */}
      {!dope.claimed && <Row title="$PAPER" value="✅ Contains 125k $PAPER" />}
      {dope.claimed && <Row title="$PAPER" value="🚫 Does not contain $PAPER" />}
      {!dope.opened && <Row title="Hustler Gear" value="✅ Contains Unpackable Gear" />}
      {dope.opened && <Row title="Hustler Gear" value="🚫 Does not contain Gear" />}
      {dope.items &&
        dope.items
          .sort(function (a, b) {
            if (ITEM_ORDER.indexOf(a.type) > ITEM_ORDER.indexOf(b.type)) {
              return 1;
            } else {
              return -1;
            }
          })
          .map(({ id, fullname, type, tier }) => {
            return (
              // @ts-ignore
              <Row
                key={id}
                title={type}
                value={fullname}
                color={DopeLegendBackgroundColors[tier]}
              />
            );
          })}
    </div>
  );
};
export default DopeCardBody;
