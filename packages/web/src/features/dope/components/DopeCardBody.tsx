// import DopePreviewButton from 'features/dope/components/DopeCardPreviewButton';
import { css } from '@emotion/react';
import { DopeCardProps } from './DopeCard';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { useState } from 'react';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import { Image } from '@chakra-ui/react';
import DopeCardItems from 'features/dope/components/DopeCardItems';
import DopeItem from 'features/dope/components/DopeItem';
import DopeStatus from 'features/dope/components/DopeStatus';

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

const DopeCardBody = ({
  dope,
  isExpanded,
}: Pick<DopeCardProps, 'dope'> & { isExpanded: boolean }) => {
  const [isRarityVisible, setRarityVisible] = useState(false);
  const toggleItemLegendVisibility = (): void => {
    setRarityVisible(!isRarityVisible);
  };

  return (
    <div
      css={css`
        flex: 1;
        background: #fff;
        padding: 8px;
        overflow-y: auto;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        align-items: stretch;
      `}
    >
      <DopeCardItems>
        <div 
          css={css`
            padding-bottom: 8px;
            font-size: var(--text-small);
            color: var(--gray-400);
            cursor: pointer;
            cursor: hand;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          `}
          onClick={toggleItemLegendVisibility}>
          <span>
            ( {dope.rank + 1} / {NUM_DOPE_TOKENS}{' '} )
          </span>
          { !dope.opened && (isRarityVisible ? '🙈' : '👀') }
        </div>
        {dope.opened &&
          <Image src="/images/hustler/vote_female.png" alt="This DOPE NFT has no Gear to Unpack" />
        }
        {!dope.opened && dope.items &&
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
                  isExpanded={isExpanded}
                  tier={tier}
                  showRarity={isRarityVisible}
                />
              );
            }
          )
        }
      </DopeCardItems>
      {/* <DopePreviewButton /> */}
      <DopeStatus content={'paper'} status={!dope.claimed} />
      <DopeStatus content={'hustler'} status={!dope.opened} />
    </div>
  );
};
export default DopeCardBody;
