/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { CloseButton } from '@chakra-ui/close-button';
import { media } from 'ui/styles/mixins';
import { useHustlersWalletQuery, useWalletQuery } from 'generated/graphql';
import { useOptimismClient } from 'components/EthereumApolloProvider';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import RenderFromChain from 'components/hustler/RenderFromChain';
import Dialog from 'components/Dialog';
import StickyNote from 'components/StickyNote';

const brickBackground = "#000000 url('/images/tile/brick-black.png') center/25% fixed";
const streetBackground =
  "#613D57 url('/images/hustler/street_scene.png') top / contain repeat-y fixed";

const Container = styled.div`
  padding: 32px 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: ${brickBackground};
  .hustlerGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-column-gap: 32px;
    grid-row-gap: 64px;
  }
  ${media.tablet`
    padding: 32px;
  `}
`;

const ContentLoading = (
  <Container>
    <LoadingBlock color="white" maxRows={10} />
  </Container>
);
const ContentEmpty = (
  <Dialog
    backgroundCss={streetBackground}
    icon="dope-smiley-sad"
    title="No hustlers found in your wallet"
    onClose={() => {}}
  >
    <p>Hustlers are the in-game and in-ecosystem characters in the Dope Wars universe.</p>
    <p>
      When you Initiate a Hustler, you receive a customizable profile pic in the form of a new NFT.
      This image can be customized at any time, and all the artwork is stored on-chain.
    </p>
    <Link href="/dope" passHref>
      <Button variant="primary">Initiate a Hustler</Button>
    </Link>
  </Dialog>
);

const Hustlers = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const router = useRouter();
  const { account } = useWeb3React();
  const client = useOptimismClient();
  const { data, loading } = useHustlersWalletQuery({
    client,
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });
  const { loading: walletLoading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });

  const handleSuccessAlert = () => {
    setShowSuccessAlert(false);
    router.replace('/hustlers');
  };

  return (
    <AppWindow requiresWalletConnection={true} padBody={false} navbar={<DopeWarsExeNav />}>
      <Head title="Your Hustler Squad" />
      {account && router.query.c === 'true' && showSuccessAlert && (
        <StickyNote>
          <div
            css={css`
              display: flex;
              align-items: center;
              width: 560px;
            `}
          >
            <p
              css={css`
                margin-right: 10px;
                padding-bottom: unset;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* number of lines to show */
                line-clamp: 2;
                -webkit-box-orient: vertical;
              `}
            >
              {
                "You've successfully customized your Hustler! It might take a minute for the changes to be reflected."
              }
            </p>{' '}
            <CloseButton onClick={handleSuccessAlert} />
          </div>
        </StickyNote>
      )}
      {loading || walletLoading ? (
        ContentLoading
      ) : !data?.wallet?.hustlers || data?.wallet?.hustlers.length === 0 ? (
        ContentEmpty
      ) : (
        <Container>
          <div className="hustlerGrid">
            {data.wallet.hustlers.map(({ id, data }) => {
              let meta = data.replace('data:application/json;base64,', '');
              meta = Buffer.from(meta, 'base64').toString();
              const decoded = JSON.parse(meta);
              return (
                <Link key={id} href={`/hustlers/${id}/customize`}>
                  <a>
                    <RenderFromChain data={decoded} id={id} />
                  </a>
                </Link>
              );
            })}
          </div>
        </Container>
      )}
    </AppWindow>
  );
};

export default Hustlers;
