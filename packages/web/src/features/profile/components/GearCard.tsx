import { css } from "@emotion/react";
import { Image, Stack } from "@chakra-ui/react";
import GearFooter from "./GearFooter";
import PanelBody from "components/PanelBody";
import ProfileCard from "features/profile/components/ProfileCard";
import ProfileCardHeader from "features/profile/components/ProfileCardHeader";

import { Item, Maybe } from 'generated/graphql';

type GearItem = Pick<Item, 'id' | 'count' | 'fullname' | 'name' | 'svg' | 'suffix' | 'type'> & {
  base?: Maybe<Pick<Item, 'svg'>>;
};;

const getImageSrc = (item: GearItem): string => {
  if (item.svg) return item.svg;
  if (item.base?.svg) return item.base.svg;
  return '/images/icon/dope-smiley.svg';
};

const getOrigin = (suffix?: string | null): string => {
  if (!suffix) return '...';
  const [, origin] = suffix.split('from ');
  return origin;
};

const GearCard = ({item, balance, showEquipFooter = false}: {item: GearItem, balance?: number, showEquipFooter?: boolean}) => {

  return (
    <ProfileCard>
      <ProfileCardHeader>
        <div>{item.name}</div>
        { balance && balance > 1 && 
          <div
            css={css`
              padding-right: 16px;
              color: var(--gray-500);
            `}
            title="You have this many in inventory"
          >
            x{balance}
          </div>
        }
      </ProfileCardHeader>
      <PanelBody>
        <Stack>
          <Image 
            borderRadius="md" 
            src={getImageSrc(item)} 
            alt={item.name} 
            css={css`
              ${getImageSrc(item).includes('/icon') ? 'opacity:0.1' : ''}
            `}
          />
          <span>Type: {item.type}</span>
          <span>Origin: {getOrigin(item.suffix)}</span>
          <span
            css={css`
              height: 2.5em;
            `}
          >
            Title: {item.fullname}
          </span>
        </Stack>
      </PanelBody>
      {showEquipFooter && <GearFooter id={item.id} />}
    </ProfileCard>
  );
}

export default GearCard;
