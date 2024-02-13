import { useEffect, useState, useMemo } from 'react';
import { useEthereum } from 'hooks/web3';
import { useWalletQuery } from 'generated/graphql';
import { useAccount } from 'wagmi';
import DopeCard from 'features/dope/components/DopeCard';
import DopeTable from 'features/dope/components/DopeTable';
import LoadingBlock from 'components/LoadingBlock';
import NoDopeCard from 'features/dope/components/NoDopeCard';
import StackedResponsiveContainer from 'components/StackedResponsiveContainer';

const DopeDetails = () => {
  const [selected, setSelected] = useState(0);

  const { address: account } = useAccount();

  const { data, isFetching: loading } = useWalletQuery({
    where: {
      id: account,
    },
  });
  useEthereum();

  const dopes = data?.wallets.edges?.[0]?.node?.dopes ?? false;

  return (
    <>
      {loading ? (
        <StackedResponsiveContainer>
          <LoadingBlock />
          <LoadingBlock />
        </StackedResponsiveContainer>
      ) : !dopes ? (
        <NoDopeCard />
      ) : (
        <StackedResponsiveContainer>
          {data?.wallets.edges?.[0] && (
            <DopeTable
              data={dopes.map(({ opened, claimed, id, rank, items }) => ({
                opened,
                claimed,
                id,
                rank,
                items,
              }))}
              selected={selected}
              onSelect={setSelected}
            />
          )}
          {data?.wallets.edges?.[0] && (
            <DopeCard dope={dopes[selected]} buttonBar="for-owner" isExpanded />
          )}
        </StackedResponsiveContainer>
      )}
    </>
  );
};

export default DopeDetails;
