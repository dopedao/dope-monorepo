/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { CloseButton } from '@chakra-ui/close-button';
import { media } from 'ui/styles/mixins';
import { useHustlersWalletQuery, useWalletQuery } from 'generated/graphql';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import RenderFromChain from 'components/hustler/RenderFromChain';
import Dialog from 'components/Dialog';
import StickyNote from 'components/StickyNote';
import { useSwitchOptimism } from 'hooks/web3';

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
  useSwitchOptimism(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertCustomizeHustler');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    window.localStorage.setItem('networkAlertCustomizeHustler', 'false');
    setShowNetworkAlert(false);
  };

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
    router.replace('/hustlers');
  };

  return (
    <AppWindow requiresWalletConnection={true} padBody={false} navbar={<DopeWarsExeNav />}>
      <Head title="Your Hustler Squad" />
      {account && chainId !== 10 && chainId !== 69 && showNetworkAlert && (
        <StickyNote>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <p
              css={css`
                margin-right: 10px;
                padding-bottom: unset;
              `}
            >
              You should switch to Optimism network to customize your hustler.
            </p>{' '}
            <CloseButton onClick={handleCloseAlert} />
          </div>
        </StickyNote>
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
                <Link key={id} href={`/hustlers/${id}/details`}>
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
