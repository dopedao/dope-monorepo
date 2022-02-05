import { useEffect, useState, useMemo } from 'react';
import { useSwitchEthereum } from 'hooks/web3';
import { useWalletQuery } from 'generated/graphql';
import { useWeb3React } from '@web3-react/core';
import DopeCard from 'features/dope/components/DopeCard';
import DopeTable from 'features/dope/components/DopeTable';
import LoadingBlock from 'components/LoadingBlock';
import NoDopeCard from 'features/dope/components/NoDopeCard';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';
import DialogSwitchNetwork from 'components/DialogSwitchNetwork';

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

  const onProperNetwork = useMemo(() => {
    return !(account && chainId !== 1 && chainId !== 42 && showNetworkAlert);
  }, [account, chainId, showNetworkAlert]);

  return (
    <>
      {!onProperNetwork && <DialogSwitchNetwork networkName="Main" />}
      {loading ? (
        <StackedResponsiveContainer>
          <LoadingBlock />
          <LoadingBlock />
        </StackedResponsiveContainer>
      ) : !data?.wallets.edges![0]?.node?.dopes ? (
        <NoDopeCard />
      ) : (
        <StackedResponsiveContainer>
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
          {onProperNetwork && data?.wallets.edges?.[0] && (
            <DopeCard
              dope={data.wallets.edges[0].node.dopes[selected]}
              buttonBar="for-owner"
              isExpanded
            />
          )}
        </StackedResponsiveContainer>
      )}
    </>
  );
};

export default DopeDetails;
