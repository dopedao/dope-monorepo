/* eslint-disable @next/next/no-img-element */
import { Link } from '@chakra-ui/layout';
import StickyNote from './StickyNote';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';

const hr = (
  <hr
    css={css`
      margin: 1em 0;
      border-color: rgba(0, 0, 0, 0.125);
    `}
  />
);

const StickyNoteHustlerMint = () => {
  const { chainId } = useWeb3React();
  const router = useRouter();
  const currentPageIsGangsta = router.pathname == '/gangsta-party';

  const addNetwork = async () => {
    if ((window as any).ethereum) {
      let params;
      if (chainId === 69) {
        alert('Optimistic Ethereum Kovan Test Network has already been added to Metamask.');
        return;
      } else {
        params = [
          {
            chainId: '0x45',
            chainName: 'Optimistic Ethereum Testnet Kovan',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://kovan.optimism.io/'],
            blockExplorerUrls: ['https://kovan-optimistic.etherscan.io/'],
          },
        ];
      }

      (window as any).ethereum
        .request({ method: 'wallet_addEthereumChain', params })
        .then(() => console.log('Success'))
        .catch((error: Error) => console.log('Error', error.message));
    } else {
      alert('Unable to locate a compatible web3 browser!');
    }
  };

  return (
    <StickyNote maxWidth="312px">
      <button
        type="button"
        css={css`
          display: flex;
          align-items: center;
          padding: 0.3rem 0.6rem;
          border-radius: 0.25rem;
          color: #f8f9fa;
          background: #586878;
          border-color: transparent;
          text-align: center;
          vertical-align: middle;
          margin: 0 auto 10px auto;
        `}
        onClick={addNetwork}
      >
        <img
          css={css`
            margin-right: 0.5rem;
          `}
          width="15"
          src="/images/icon/metamaskicon.svg"
          alt="Metamask"
        />{' '}
        Add OP Kovan Network
      </button>
      <h3>
        <Link href="/hustlers/initiate" variation="primary">
          <a className="primary">👉 Mint Your Hustler Here 👈</a>
        </Link>
      </h3>
      {hr}
      <span>
        <a
          href="https://dope-wars.notion.site/Hustler-Minting-and-Unbundling-25c6dfb9dca64196aedf8def6297c51a"
          target="hustler-minting-faq"
          className="primary"
        >
          Minting FAQ
        </a>
      </span>
      {!currentPageIsGangsta && (
        <>
          {hr}
          <span>
            <a href="/gangsta-party" className="primary">
              Gangsta Party
            </a>
          </span>
        </>
      )}
    </StickyNote>
  );
};

export default StickyNoteHustlerMint;
