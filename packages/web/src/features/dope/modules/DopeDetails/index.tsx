import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { css } from '@emotion/react';
import { CloseButton } from '@chakra-ui/close-button';
import { useWalletQuery } from 'generated/graphql';
import LoadingBlock from 'components/LoadingBlock';
import DopeCard from 'features/dope/components/DopeCard';
import DopeTable from 'features/dope/components/DopeTable';
import NoDopeCard from 'features/dope/components/NoDopeCard';
import { useSwitchEthereum } from 'hooks/web3';
import StickyNote from 'components/StickyNote';
import { FlexFiftyContainer } from './styles';

const DopeDetails = () => {
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const [selected, setSelected] = useState(0);
  const { account, chainId } = useWeb3React();

  const { data, isFetching: loading } = useWalletQuery({
    where: {
      id: account,
    },
  });
  useSwitchEthereum(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertInitiateHustler');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    window.localStorage.setItem('networkAlertInitiateHustler', 'false');
    setShowNetworkAlert(false);
  };

  return (
    <>
      {account && chainId !== 1 && chainId !== 42 && showNetworkAlert && (
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
              You should switch to Main network to customize your hustler.
            </p>{' '}
            <CloseButton onClick={handleCloseAlert} />
          </div>
        </StickyNote>
      )}
      {loading ? (
        <FlexFiftyContainer>
          <LoadingBlock />
          <LoadingBlock />
        </FlexFiftyContainer>
      ) : !data?.wallets.edges![0]?.node?.dopes ? (
        <NoDopeCard />
      ) : (
        <FlexFiftyContainer>
          {data?.wallets.edges?.[0] && (
            <DopeTable
              data={data.wallets.edges[0].node.dopes.map(
                ({ opened, claimed, id, rank, items }) => ({
                  opened,
                  claimed,
                  id,
                  rank,
                  items,
                }),
              )}
              selected={selected}
              onSelect={setSelected}
            />
          )}
          {data?.wallets.edges?.[0] && (
            <DopeCard
              dope={data.wallets.edges[0].node.dopes[selected]}
              buttonBar="for-owner"
              isExpanded
            />
          )}
        </FlexFiftyContainer>
      )}
    </>
  );
};

export default DopeDetails;
