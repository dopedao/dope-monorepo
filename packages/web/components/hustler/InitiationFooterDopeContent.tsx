import styled from '@emotion/styled';
import { Button } from '@chakra-ui/button';
import { ChangeEvent, useState } from 'react';
import { css } from '@emotion/react';
import { Select } from '@chakra-ui/react';
import { useWalletQuery } from '../../src/generated/graphql';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import PanelFooter from '../PanelFooter';
import LoadingBlock from '../LoadingBlock';

const AuthenticatedContent = ({ id }: { id: string }) => {
  const { account } = useWeb3React();

  const { data, loading } = useWalletQuery({
    variables: { id: account.toLowerCase() },
  });
  const [selected, setSelected] = useState(0);

  if (loading) {
    return <LoadingBlock />;
  } else if (!data?.wallet?.bags || data.wallet.bags.length === 0) {
    return <NoLootCard />;
  } else {
    return (
      <FlexFiftyContainer>
        <LootTable
          data={data.wallet.bags.map(({ bundled, claimed, id, rank }) => ({
            bundled,
            claimed,
            id,
            rank,
          }))}
          selected={selected}
          onSelect={setSelected}
        />
        <LootCard bag={data.wallet.bags[selected]} footer="for-owner" />
      </FlexFiftyContainer>
    );
  }
};

const hasDopeNft = false;

const NoDopeMessage = () => {
  const caution = <span css={css`color: #767674;`}>***</span>;
  return (
    <PanelFooter css={css`height:auto;`}>
      <div css={css`text-align:center;padding:16px;`}>
        <p>{caution} NO DOPE IN WALLET {caution}</p>
        <Link href="/swap-meet?status=For+Sale&sort_by=Most+Affordable">
          <Button variant='primary'>Shop for DOPE NFTs</Button>
        </Link>
      </div>
    </PanelFooter>
  );
}

const SubPanelForm = styled.div`
  border-top: 1px solid black;
  background-color: #ffffff;
  select {
    border-bottom: 1px solid #DEDEDD;
  }
`;

const MintHustlerControls = () => {
  const [dopeToInitiate, setDopeToInitiate] = useState<string>('');

  const handleDopeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDopeToInitiate(value);
    // statusCallback(value);
  };

  return <div>
    <SubPanelForm>
      <Select size="sm" variant="filterBar" onChange={handleDopeChange} value={dopeToInitiate}>
        <option disabled>UNBUNDLED DOPE</option>
        {/* {statusKeys.map(value => (
          <option>{value}</option>
        ))} */}
      </Select>
      <div css={css`
        display: flex;
        justify-content: space-between;
        padding: 8px 12px;
      `}>
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
      <Button variant='primary'>Continue Initiation</Button>
    </PanelFooter>
  </div>
}


const InitiationFooterDopeContent = () => {  
  if (hasDopeNft) {
    return <MintHustlerControls />;    
  } else {
    return <NoDopeMessage />;
  }
}

export default InitiationFooterDopeContent;
