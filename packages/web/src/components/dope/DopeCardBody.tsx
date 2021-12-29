import { css } from '@emotion/react';
import { DopeLegendBackgroundColors } from 'components/dope/DopeLegend';
import ItemRarities from 'dope-metrics/output/item-rarities.json';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import { DopeCardProps } from './DopeCard';
import Row from 'components/dope/Row';

const itemBackgroundColors = Object.values(DopeLegendBackgroundColors);

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
      <Row title="Rank" value={`${dope.rank} / ${NUM_DOPE_TOKENS}`} />
      {/* PAPER */}
      {!dope.claimed && <Row title="$PAPER" value="✅ 125,000 Claimable ✅" />}
      {dope.claimed && <Row title="$PAPER" value="🚫 Claimed 🚫" />}
      {!dope.opened && <Row title="Bundled" value="✅ Ready to Unpack ✅" />}
      {dope.opened && <Row title="Bundled" value="🚫 Unpacked 🚫" />}
      {dope.items!.map(({ id, name, type }) => (
        <Row
          key={id}
          title={type}
          value={name}
          color={itemBackgroundColors[(ItemRarities as { [name: string]: any })[name]] as string}
        />
      ))}
    </div>
  );
};
export default DopeCardBody;
