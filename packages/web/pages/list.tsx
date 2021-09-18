import styled from '@emotion/styled';
import { AuctionManager, useManageAuction } from '@zoralabs/manage-auction-hooks';
import { NFTDataContext, NFTPreview, PreviewComponents } from '@zoralabs/nft-components';
import { FetchStaticData } from '@zoralabs/nft-hooks';
import { Fragment, useContext } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';

import Head from '../components/head';
import ConnectWallet from '../components/ConnectWallet';
import { PageWrapper } from './../styles/components';
import AppWindow from '../components/AppWindow';

const ListItemComponent = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);

  const { openManageAuction, openListAuction } = useManageAuction();

  if (!data || !data.nft) {
    return <Fragment />;
  }

  if (data.pricing.reserve?.status === 'Active' || data.pricing.reserve?.status === 'Pending') {
    return (
      <button
        className="button"
        onClick={() => {
          const reserveId = data.pricing.reserve?.id;
          if (reserveId) {
            openManageAuction(parseInt(reserveId, 10));
          }
        }}
      >
        Manage
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        openListAuction(data.nft.contract.address, data.nft.tokenId);
      }}
      className="button"
    >
      List
    </button>
  );
};

const RenderOwnedList = ({ account }: { account: string }) => {
  const { data, error } = useSWR(`/api/ownedItems?owner=${account}`, (url: string) =>
    fetch(url).then(res => res.json()),
  );

  if (!data) {
    // loading
    return <Fragment />;
  }
  if (error) {
    // error
    return <Fragment />;
  }

  if (data.tokens.length === 0) {
    return (
      <div className="owned-list-no-tokens">
        <h2>We couldn’t find any NFTs you own 😢</h2>
        <p>Make sure you’ve connected the correct wallet</p>
      </div>
    );
  }

  return data.tokens.map((token: any) => {
    const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
    return (
      <NFTPreview
        id={tokenInfo.tokenId}
        contract={tokenInfo.tokenContract}
        initialData={token}
        useBetaIndexer={true}
        key={`${tokenInfo.tokenContract}-${tokenInfo.tokenId}`}
      >
        <div className="owned-list-item">
          <PreviewComponents.MediaThumbnail />
          <div className="list-component-wrapper">
            <ListItemComponent />
          </div>
        </div>
      </NFTPreview>
    );
  });
};

const MediaThumbnailPreview = ({
  tokenContract,
  tokenId,
}: {
  tokenContract: string;
  tokenId: string;
}) => {
  return (
    // TODO(iain): Fix indexer in this use case
    <NFTPreview id={tokenId} contract={tokenContract} useBetaIndexer={true}>
      <div className="owned-list-item">
        <PreviewComponents.MediaThumbnail />
        <div className="list-component-wrapper">
          <ListItemComponent />
        </div>
      </div>
    </NFTPreview>
  );
};

const ListWrapper = styled(PageWrapper)`
  max-width: var(--content-width-lg);
  .owned-list {
    padding-top: var(--space-md);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .owned-list-no-tokens {
    text-align: center;
    padding-top: var(--space-sm);
  }
  .list-component-wrapper {
    padding: var(--base-unit) 0;
    border-top: var(--border-light);
  }
  .thumbnail-manage-button {
    margin: 0 auto var(--space-sm) !important;
  }
`;

export default function YourLoot() {
  const { account } = useWeb3React();
  return (
    <AppWindow>
      <Head title="List" />
      <AuctionManager
        renderMedia={MediaThumbnailPreview}
        strings={{
          LIST_MEDIA_HEADER: 'List your NFT',
          LIST_MEDIA_DESCRIPTION: `Set the reserve price to list your NFT on ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        }}
      >
        <ListWrapper>
          {account ? (
            <div className="owned-list">
              <RenderOwnedList account={account} />
            </div>
          ) : (
            <ConnectWallet />
          )}
        </ListWrapper>
      </AuctionManager>
    </AppWindow>
  );
}
