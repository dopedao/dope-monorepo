import { Button } from '@chakra-ui/button';
import { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { HustlerIdToInitiate } from '../../src/HustlerInitiation';
import { NUM_DOPE_TOKENS } from '../../src/constants';
import { PickedBag } from '../../src/DopeDatabase';
import { Select } from '@chakra-ui/react';
import { useReactiveVar } from '@apollo/client';
import { useWalletQuery, WalletQuery } from '../../src/generated/graphql';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import PanelFooter from '../PanelFooter';
import styled from '@emotion/styled';

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

  const visibleHustlerId = useReactiveVar(HustlerIdToInitiate);

  const handleDopeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log(value);
    HustlerIdToInitiate(value);
  };

  const getBundledDopeFromData = (data: WalletQuery) => {
    let bundledDope = [] as PickedBag[];
    if (data?.wallet?.bags && data.wallet.bags.length > 0) {
      bundledDope = data.wallet.bags.filter((dopeNft: PickedBag) => dopeNft.bundled);    
    }
    return bundledDope;
  }

  const { data, loading } = useWalletQuery({
    variables: { id: account.toLowerCase() },
    // Set first item as selected when it comes back from
    // the contract query.
    onCompleted: (data) => {
      const bundledDope = getBundledDopeFromData(data);
      const randomHustlerSelected = (parseInt(visibleHustlerId) > NUM_DOPE_TOKENS);
      if (bundledDope.length > 0 && randomHustlerSelected) {
        const firstDopeId = bundledDope[0].id;
        console.log(`Setting hustler ID from dope returned: ${firstDopeId}`);
        HustlerIdToInitiate(firstDopeId);
      }
    }
  });

  if (loading) {
    return <PanelFooter>Loading…</PanelFooter>;
  } else if (!data?.wallet?.bags || data.wallet.bags.length === 0) {
    return <NoDopeMessage />;
  } else {
    // Prevent controls from showing if no qualified DOPE
    const bundledDope = getBundledDopeFromData(data);
    if (bundledDope.length == 0) return <NoDopeMessage />;
    return (
      <div>
        <SubPanelForm>
          <Select size="sm" 
            variant="filterBar" 
            onChange={handleDopeChange} 
            value={visibleHustlerId}
          >
            <option disabled>YOUR DOPE</option>
            {bundledDope.map(dopeNft => (
              <option 
                key={dopeNft.id}
                value={dopeNft.id}
              >
                DOPE NFT #{dopeNft.id}
              </option>
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
