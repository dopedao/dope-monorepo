import { css } from '@emotion/react';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import { DopeCardProps } from './DopeCard';
import DopeCardItems from 'features/dope/components/DopeCardItems';
import DopeStatus from 'features/dope/components/DopeStatus';
import DopeItem from 'features/dope/components/DopeItem';
import DopePreviewButton from 'features/dope/components/DopeCardPreviewButton';

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
      css={css`
        flex: 1;
        background: #fff;
        padding: 8px;
        overflow-y: auto;
        border-radius: 5px;
      `}
    >
      <DopeCardItems>
        {dope.items &&
          dope.items
            .sort(function (a, b) {
              if (ITEM_ORDER.indexOf(a.type) > ITEM_ORDER.indexOf(b.type)) {
                return 1;
              } else {
                return -1;
              }
            })
            .map(({ id, name, namePrefix, nameSuffix, suffix, augmented, type, tier }) => {
              return (
                // @ts-ignore
                <DopeItem
                  key={id}
                  name={name}
                  namePrefix={namePrefix}
                  nameSuffix={nameSuffix}
                  suffix={suffix}
                  augmented={augmented}
                  type={type}
                  color={DopeLegendColors[tier]}
                />
              );
            })
        }
      </DopeCardItems>
      <DopePreviewButton />
      <DopeStatus content={"paper"} status={!dope.claimed} />
      <DopeStatus content={"hustler"} status={!dope.opened} />
      <div
        css={css`
          margin: 8px;
        `}
      >Rank: {dope.rank + 1} / {NUM_DOPE_TOKENS} </div>
    </div>
  );
};
export default DopeCardBody;
