import { NFTDataType } from '@zoralabs/nft-hooks';

import { NFTPreview, PreviewComponents } from '@zoralabs/nft-components';
import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';
import { rarityImageFromItems } from 'gear-rarity';
import loots from 'dope-metrics/output/loot.json';

import { TokenWithAuctionFragment } from '@zoralabs/nft-hooks/dist/graph-queries/zora-indexer-types';

const slotOrder = [
  'clothes',
  'foot',
  'hand',
  'neck',
  'ring',
  'waist',
  'weapon',
  'drugs',
  'vehicle',
];

export function getContentData(nft: NFTDataType, metadata: any) {
  const bag = loots.find(loot => loot[nft.nft.tokenId])[nft.nft.tokenId];
  const image = rarityImageFromItems(slotOrder.map(slot => bag[slot]));
  metadata.image = image;
  return { metadata };
}

// Create A Token Thumbnail
export const TokenThumbnail = ({
  token,
  linkDetails = true,
}: {
  token: TokenWithAuctionFragment;
  linkDetails?: boolean;
}) => {
  const listed = token.auctions && token.auctions.length > 0;
  const router = useRouter();
  const linkTarget = listed ? `/${token.address}/${token.tokenId}` : '/list';

  const wrapperLink = linkDetails
    ? {
        onClick: (evt: SyntheticEvent) => {
          evt.preventDefault();
          router.push(linkTarget);
        },
        href: linkTarget,
      }
    : {};
  return (
    <NFTPreview
      key={`${token.address}-${token.tokenId}`}
      contract={token.address}
      id={`${token.tokenId}`}
      initialData={token}
      useBetaIndexer={true}
    >
      <div
        key={token.tokenId}
        className={`thumbnail-wrapper ${!listed ? 'not-listed' : ''} ${
          token.auctions &&
          token.auctions.length > 0 &&
          (token.auctions[0].bidEvents.length > 0 ? 'auction-live' : 'listed')
        }`}
        {...wrapperLink}
      >
        <PreviewComponents.MediaThumbnail getContentData={getContentData} />
        {token.auctions && token.auctions.length > 0 && <PreviewComponents.PricingComponent />}
      </div>
    </NFTPreview>
  );
};
