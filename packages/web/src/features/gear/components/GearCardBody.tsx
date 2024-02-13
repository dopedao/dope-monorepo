import { css } from '@emotion/react';
import { Item, Maybe } from 'generated/graphql';
import { Image, Stack, Table, Tbody, Tr, Td } from '@chakra-ui/react';
import PanelBody from 'components/PanelBody';

export type GearItem = Pick<
  Item,
  'id' | 'count' | 'fullname' | 'name' | 'svg' | 'suffix' | 'type' | 'bestAskPriceEth'
> & {
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

const GearImage = ({ item }: { item: GearItem }) => (
  <Image
    borderRadius="md"
    src={getImageSrc(item)}
    alt={item.name}
    css={css`
      ${getImageSrc(item).includes('/icon') ? 'opacity:0.1' : ''}
    `}
  />
);

const GearCardBody = ({ item }: { item: GearItem }) => {
  return (
    <PanelBody>
      <Stack>
        <GearImage item={item} />
        <Table variant="small">
          <Tbody>
            <Tr>
              <Td>Type:</Td>
              <Td>{item.type.toUpperCase()}</Td>
            </Tr>
            <Tr>
              <Td>Title: </Td>
              <Td>{item.fullname}</Td>
            </Tr>
            <Tr>
              <Td>Origin:</Td>
              <Td>{getOrigin(item.suffix)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
    </PanelBody>
  );
};

export default GearCardBody;
