import { css } from '@emotion/react';
import { Image, Stack } from '@chakra-ui/react';
import GearEquipFooter from './GearEquipFooter';
import GearUnEquipFooter from './GearUnEquipFooter';
import PanelBody from 'components/PanelBody';
import ProfileCard from 'features/profile/components/ProfileCard';
import ProfileCardHeader from 'features/profile/components/ProfileCardHeader';
import ItemCount from './ItemCount';
import { Item, Maybe } from 'generated/graphql';
import { BigNumberish, utils } from 'ethers';
import { Table, Tr, Td } from '@chakra-ui/react';

type GearItem = Pick<Item, 'id' | 'count' | 'fullname' | 'name' | 'svg' | 'suffix' | 'type'> & {
  base?: Maybe<Pick<Item, 'svg'>>;
};

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

const GearCard = ({
  item,
  balance,
  showEquipFooter = false,
  showUnEquipFooter = false,
  hustlerId,
}: {
  item: GearItem;
  balance?: number;
  showEquipFooter?: boolean;
  showUnEquipFooter?: boolean;
  hustlerId?: BigNumberish;
}) => {
  return (
    <ProfileCard>
      <ProfileCardHeader>
        <div>{item.name}</div>
        {balance && balance > 1 && (
          <div
            css={css`
              padding-right: 16px;
              color: var(--new-year-red);
            `}
            title="You have this many in inventory"
          >
            <ItemCount count={balance} />
          </div>
        )}
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
          <Table variant="small">
            <Tr>
              <Td>Type:</Td>
              <Td>{item.type}</Td>
            </Tr>
            <Tr>
              <Td>Origin:</Td>
              <Td>{getOrigin(item.suffix)}</Td>
            </Tr>
            <Tr>
              <Td>Title: </Td>
              <Td>{item.fullname}</Td>
            </Tr>
          </Table>
        </Stack>
      </PanelBody>
      {showEquipFooter && <GearEquipFooter id={item.id} />}
      {showUnEquipFooter && hustlerId && 
        <GearUnEquipFooter 
          id={item.id} 
          type={item.type}
          hustlerId={hustlerId} 
        />}
    </ProfileCard>
  );
};

export default GearCard;
