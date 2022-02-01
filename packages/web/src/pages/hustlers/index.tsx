/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/react';
import { CloseButton } from '@chakra-ui/close-button';
import { css } from '@emotion/react';
import { media } from 'ui/styles/mixins';
import { useEffect, useState } from 'react';
import { useHustlersWalletQuery, useWalletQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useSwitchOptimism } from 'hooks/web3';
import { useWeb3React } from '@web3-react/core';
import AppWindow from 'components/AppWindow';
import Dialog from 'components/Dialog';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import Link from 'next/link';
import LoadingBlock from 'components/LoadingBlock';
import RenderFromChain from 'components/hustler/RenderFromChain';
import DialogSwitchNetwork from 'components/DialogSwitchNetwork';
import styled from '@emotion/styled';
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
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const router = useRouter();
  const { account, chainId } = useWeb3React();
  // useSwitchOptimism(chainId, account);

  // useEffect(() => {
  //   const localNetworkAlert = localStorage.getItem('networkAlertCustomizeHustler');

  //   if (localNetworkAlert !== 'true') {
  //     setShowNetworkAlert(true);
  //   }
  // }, []);

  const { data, isFetching: loading } = useHustlersWalletQuery(
    {
      where: {
        id: account,
      },
    },
    {
      enabled: !!account,
    },
  );

  const { isFetching: walletLoading } = useWalletQuery(
    {
      where: {
        id: account,
      },
    },
    {
      enabled: !!account,
    },
  );

  const handleSuccessAlert = () => {
    setShowSuccessAlert(false);
    router.replace('/inventory');
  };

  return (
    <AppWindow requiresWalletConnection={true} padBody={false} navbar={<DopeWarsExeNav />}>
      <Head title="Your Hustler Squad" />
      {account && chainId !== 10 && chainId !== 69 && showNetworkAlert && (
        <DialogSwitchNetwork networkName="Optimism" />
      )}
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
      ) : !data?.wallets.edges![0]?.node?.hustlers ? (
        ContentEmpty
      ) : (
        <Container>
          <div className="hustlerGrid">
            {data.wallets.edges[0].node.hustlers.map(({ id, svg, name }) => {
              if (!svg) return null;
              return (
                <Link key={id} href={`/hustlers/${id}/customize`}>
                  <a>
                    <RenderFromChain
                      data={{
                        image: svg,
                        name,
                      }}
                      id={id}
                    />
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
