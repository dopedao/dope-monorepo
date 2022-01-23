import { css } from '@emotion/react';
import { DopeCardProps } from './DopeCard';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { Image } from '@chakra-ui/react';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import { useState } from 'react';
import { Link } from '@chakra-ui/layout';
import DopeCardItems from 'features/dope/components/DopeCardItems';
import DopeItem from 'features/dope/components/DopeItem';
import DopePreviewButton from 'features/dope/components/DopeCardPreviewButton';
import DopeStatus from 'features/dope/components/DopeStatus';
import RenderFromDopeIdOnly from 'components/hustler/RenderFromDopeIdOnly';
import HustlerContainer from 'components/hustler/HustlerContainer';

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
  const [isPreviewShown, setPreviewShown] = useState(false);
  const [isRarityVisible, setRarityVisible] = useState(false);
  const toggleItemLegendVisibility = (): void => {
    setRarityVisible(!isRarityVisible);
  };
  const togglePreview = (): void => {
    setPreviewShown(!isPreviewShown);
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
          <div css={css`display:flex;justify-content:center;align-items:center;height:100%;padding-bottom:7.5em;`}>
            <Image 
              src="/images/hustler/vote_female.png" 
              alt="This DOPE NFT has no Gear to Unpack" 
            />
          </div>
        }
        { isPreviewShown && <>
            <HustlerContainer bgColor="transparent">
              <RenderFromDopeIdOnly id={dope.id} /> 
            </HustlerContainer>
            <div className="smallest" css={css`color:rgba(255,255,255,0.75);padding-bottom:2em;text-align:center;`}>
              Hustler must be Initiated as a separate NFT.
              <Link
                href="https://dope-wars.notion.site/Hustler-Guide-ad81eb1129c2405f8168177ba99774cf"
                target="hustler-minting-faq"
                className="underline"
                css={css`display: inline-block !important;`}
              >Read the Hustler Guide for more info.</Link>
            </div>
          </>
        }
        {!dope.opened && dope.items && !isPreviewShown &&
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
      { !dope.opened && 
        <DopePreviewButton togglePreview={togglePreview} isPreviewShown={isPreviewShown} />
      }
      
      <DopeStatus content={'hustler'} status={!dope.opened} />
      <DopeStatus content={'paper'} status={!dope.claimed} />
    </div>
  );
};
export default DopeCardBody;
