import styled from '@emotion/styled';
import { Button } from '@chakra-ui/button';
import { ChangeEvent, useState } from 'react';
import { css } from '@emotion/react';
import { Select } from '@chakra-ui/react';
import { useWalletQuery } from '../../src/generated/graphql';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import PanelFooter from '../PanelFooter';

const hasDopeNft = false;

const NoDopeMessage = () => {
  const caution = (
    <span
      css={css`
        color: #767674;
      `}
    >
      ***
    </span>
  );
  return (
    <PanelFooter
      css={css`
        height: auto;
      `}
    >
      <div
        css={css`
          text-align: center;
          padding: 16px;
        `}
      >
        <p>
          {caution} NO BUNDLED DOPE IN WALLET {caution}
        </p>
        <Link href="/swap-meet?status=For+Sale&sort_by=Most+Affordable">
          <Button variant="primary">Shop for DOPE NFTs</Button>
        </Link>
      </div>
    </PanelFooter>
  );
};

const SubPanelForm = styled.div`
  border-top: 1px solid black;
  background-color: #ffffff;
  select {
    border-bottom: 1px solid #dededd;
  }
`;

const InitiationFooterDopeContent = () => {
  const { account } = useWeb3React();
  if (!account) return <NoDopeMessage />;

  const [dopeToInitiate, setDopeToInitiate] = useState<string>('');

  const handleDopeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDopeToInitiate(value);
    // statusCallback(value);
  };

  const { data, loading } = useWalletQuery({
    variables: { id: account.toLowerCase() },
  });

  if (loading) {
    return <PanelFooter>Loading…</PanelFooter>;
  } else if (!data?.wallet?.bags || data.wallet.bags.length === 0) {
    return <NoDopeMessage />;
  } else {
    const bundledDope = data.wallet.bags.filter(dopeNft => dopeNft.bundled);
    // Prevent controls from showing if no qualified DOPE
    if (bundledDope.length == 0) return <NoDopeMessage />;

    return (
      <div>
        <SubPanelForm>
          <Select size="sm" variant="filterBar" onChange={handleDopeChange} value={dopeToInitiate}>
            <option disabled>YOUR DOPE</option>
            {bundledDope.map(dopeNft => (
              <option>DOPE NFT #{dopeNft.id}</option>
            ))}
          </Select>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              padding: 8px 12px;
            `}
          >
            <Link href="/hustler/customize">
              <a className="primary">Customize Appearance</a>
            </Link>
            <Link href="/randomize">
              <a className="primary">Randomize</a>
            </Link>
          </div>
        </SubPanelForm>
        <PanelFooter>
          <div></div>
          <Button variant="primary">Continue Initiation</Button>
        </PanelFooter>
      </div>
    );
  }
};

export default InitiationFooterDopeContent;
