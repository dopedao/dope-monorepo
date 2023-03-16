import { css } from '@emotion/react';
import { DopeCardProps, DopeItemApiResponse } from './DopeCard';
import { DopeLegendColors } from 'features/dope/components/DopeLegend';
import { Image } from '@chakra-ui/react';
import { NUM_DOPE_TOKENS } from 'utils/constants';
import { useState, useRef } from 'react';
import { Link } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import DopeCardItems from 'features/dope/components/DopeCardItems';
import DopeItem from 'features/dope/components/DopeItem';
import DopeCardPreviewButton from 'features/dope/components/DopeCardPreviewButton';
import DopeStatus from 'features/dope/components/DopeStatus';
import RenderFromDopeIdOnly from 'components/hustler/RenderFromDopeIdOnly';
import HustlerContainer from 'components/hustler/HustlerContainer';

export const ITEM_ORDER = [
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

const FinePrint = styled.div`
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  font-size: var(--text-smallest);
`;

const DopeCardBody = ({
  dope,
  isExpanded,
  hidePreviewButton = false,
  showDopeClaimStatus = false,
}: {
  dope: Omit<DopeItemApiResponse, 'listings'>;
  isExpanded: boolean;
  hidePreviewButton?: boolean;
  showDopeClaimStatus?: boolean;
}) => {
  const [isPreviewShown, setPreviewShown] = useState(false);
  const [isRarityVisible, setRarityVisible] = useState(false);
  const hustlerItemsRef = useRef<HTMLDivElement>(null);
  const hustlerPreviewRef = useRef<HTMLDivElement>(null);

  const toggleItemLegendVisibility = (): void => {
    setRarityVisible(!isRarityVisible);
  };
  // Toggles preview and smoothly scrolls into view
  const togglePreview = (): void => {
    setPreviewShown(!isPreviewShown);
    const scrollParams = {
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    } as ScrollIntoViewOptions;
    if (isPreviewShown && hustlerItemsRef.current) {
      hustlerItemsRef.current.scrollIntoView(scrollParams);
    } else if (!isPreviewShown && hustlerPreviewRef.current) {
      hustlerPreviewRef.current.scrollIntoView(scrollParams);
    }
  };

  return (
    <div
      css={css`
        flex: 1;
        background: #fff;
        padding: 16px;
        overflow-y: ${isExpanded ? 'auto' : 'hidden'};
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        align-items: stretch;
      `}
    >
      <DopeCardItems isExpanded={isExpanded}>
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
          onClick={toggleItemLegendVisibility}
        >
          <span>
            ( {dope.rank + 1} / {NUM_DOPE_TOKENS} )
          </span>
          {!dope.opened && isExpanded && (isRarityVisible ? '🙈' : '👀')}
        </div>
        {dope.opened && isExpanded && (
          <div>
            <HustlerContainer bgColor="transparent">
              <Image
                src="/images/hustler/vote_female.png"
                alt="This DOPE NFT has no Gear to Unpack"
              />
              <FinePrint>
                This DOPE NFT has been fully claimed. It serves as a DAO voting token, and will be
                eligible for future airdrops.
              </FinePrint>
            </HustlerContainer>
          </div>
        )}
        {!dope.opened && dope.items && (
          <div
            className="slideContainer"
            css={css`
              display: flex;
              overflow: hidden;
              scroll-snap-type: x mandatory;
              scroll-behavior: smooth;
              -webkit-overflow-scrolling: touch;
              div.slide {
                width: 100%;
                height: 100%;
                scroll-snap-align: start;
                flex-shrink: 0;
                margin-right: 40px;
                transform-origin: center center;
                transform: scale(1);
                transition: transform 0.5s;
                position: relative;
                color: var(--gray-400);
              }
            `}
          >
            <div className="slide" ref={hustlerItemsRef}>
              {dope.items
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
                })}
            </div>
            <div className="slide" ref={hustlerPreviewRef}>
              <HustlerContainer bgColor="transparent">
                {!hidePreviewButton && isPreviewShown && <RenderFromDopeIdOnly id={dope.id} />}
                <FinePrint>
                  Hustler must be Initiated as a separate NFT.
                  <br />
                  <Link
                    href="https://dope-wars.notion.site/Hustler-Guide-ad81eb1129c2405f8168177ba99774cf"
                    target="hustler-minting-faq"
                    className="underline"
                    css={css`
                      display: inline-block !important;
                    `}
                  >
                    Read the Hustler Guide for more info.
                  </Link>
                </FinePrint>
              </HustlerContainer>
            </div>
          </div>
        )}
      </DopeCardItems>
      {!hidePreviewButton && isExpanded && (
        <DopeCardPreviewButton
          togglePreview={togglePreview}
          isPreviewShown={isPreviewShown}
          disabled={dope.opened}
        />
      )}
      {showDopeClaimStatus && (
        <>
          <DopeStatus content={'hustler'} status={!dope.opened} />
          <DopeStatus content={'paper'} status={!dope.claimed} />
        </>
      )}
    </div>
  );
};
export default DopeCardBody;
