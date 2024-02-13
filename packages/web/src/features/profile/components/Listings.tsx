import SectionHeader from './SectionHeader';
import SectionContent from './SectionContent';
import ItemCount from './ItemCount';
import { ListingsContext } from 'providers/ReservoirListingsProvider';
import { findChainIdAndContractKey } from 'utils/constants';
import { HStack, Text } from '@chakra-ui/react';
import { useContext } from 'react';

import GearCard from './GearCard';
import DopeCard from 'features/dope/components/DopeCard';
import HustlerProfileCard from 'features/hustlers/components/HustlerProfileCard';

import CardContainer from './CardContainer';
import Dialog from 'components/Dialog';

import { useSearchQuery, Dope, Item, Hustler } from 'generated/graphql';
import { REFETCH_INTERVAL } from 'utils/constants';
import LoadingBlock from 'components/LoadingBlock';

import { useAccount } from 'wagmi';

// Show Reservoir listings for all owned tokens
const Listings = () => {
  const { listings } = useContext(ListingsContext);
  const { address } = useAccount();

  const hustlerIds: string[] = [];
  const dopeIds: string[] = [];
  const itemIds: string[] = [];

  // Need to transform Reservoir Listings into a format that can be queried
  // with our search endpoint, which returns any kind of item for sale
  // based on a materialized view
  for (const listing of listings) {
    const ca = listing.contract ?? '';
    if (!ca) continue;
    const { contractKey } = findChainIdAndContractKey(ca);
    const tokenId = listing.tokenSetId.split(':')[2];
    switch (contractKey) {
      case 'hustlers':
        hustlerIds.push(tokenId);
        break;
      case 'dope':
        dopeIds.push(tokenId);
        break;
      case 'swapmeet':
        itemIds.push(tokenId);
        break;
    }
  }

  const whereInput = [];
  if (hustlerIds.length > 0) {
    whereInput.push({ hasHustlerWith: [{ idIn: hustlerIds }] });
  }
  if (dopeIds.length > 0) {
    whereInput.push({ hasDopeWith: [{ idIn: dopeIds }] });
  }
  if (itemIds.length > 0) {
    whereInput.push({ hasItemWith: [{ idIn: itemIds }] });
  }

  const { data, isLoading } = useSearchQuery(
    {
      // Hack to not fetch anything if there are no listings
      // that came back from the reservoir api
      // We don't store wallet owner on search materialized view.
      first: listings.length > 0 ? listings.length : 0,
      query: '',
      where: { or: whereInput },
    },
    {
      queryKey: ['profile-listings', address, hustlerIds, dopeIds, itemIds],
      refetchInterval: REFETCH_INTERVAL,
    },
  );

  const listingMatches = data?.search?.edges;
  const hasListingMatches = listingMatches && listingMatches.length > 0;

  const dopes = data?.search?.edges?.map(m => m?.node?.dope);
  const hustlers = data?.search?.edges?.map(m => m?.node?.hustler);
  const items = data?.search?.edges?.map(m => m?.node?.item);

  return (
    <>
      <SectionHeader>
        <HStack alignContent="center" justifyContent="space-between" width="100%" marginRight="8px">
          <span>For Sale</span>
          <ItemCount count={listings.length} />
        </HStack>
      </SectionHeader>
      <SectionContent>
        {isLoading && <LoadingBlock />}

        {!isLoading && !hasListingMatches && (
          <Dialog backgroundCss="">
            <Text fontSize="medium">No listings found.</Text>
            <Text>
              If you&apos;ve listed something recently it might take a few moments for it to show
              up.
            </Text>
          </Dialog>
        )}

        {!isLoading && hasListingMatches && (
          <CardContainer>
            {hustlers?.map(
              (h, index) =>
                h && <HustlerProfileCard key={h.id} hustler={h as Hustler} showOwnerDetails />,
            )}
            {items?.map(
              (i, index) =>
                i && <GearCard key={i.id} item={i as Item} balance={1} showEquipFooter />,
            )}
            {dopes?.map(
              (d, index) =>
                d && <DopeCard key={d.id} dope={d as Dope} buttonBar="for-owner" isExpanded />,
            )}
          </CardContainer>
        )}
      </SectionContent>
    </>
  );
};
export default Listings;
