import { Button, Select } from '@chakra-ui/react';
import { NETWORK } from 'utils/constants';
import { useHustlersWalletQuery } from "generated/graphql";
import { useOptimism } from "hooks/web3";
import { useState, useEffect, useCallback } from "react";
import { useSwapMeet } from "hooks/contracts";
import { useWeb3React } from "@web3-react/core";
import { utils } from 'ethers';
import PanelFooter from "components/PanelFooter";

const GearFooter = ({ id }: { id: string }) => {
  const { account } = useWeb3React();
  const { chainId } = useOptimism();
  const [selected, setSelected] = useState<string>();
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

  const swapmeet = useSwapMeet();

  useEffect(() => {
    if (
      data &&
      data.wallets.edges &&
      data.wallets.edges[0] &&
      data.wallets.edges[0].node &&
      data.wallets.edges[0].node.hustlers.length > 0
    ) {
      setSelected(data.wallets.edges[0].node.hustlers[0].id);
    }
  }, [data]);

  const equip = useCallback(() => {
    const sig = '0xbe3d1e89';
    const abi = new utils.AbiCoder();
    swapmeet.safeTransferFrom(
      account!,
      NETWORK[chainId].contracts.hustlers,
      id,
      1,
      abi.encode(['bytes4', 'uint256'], [sig, selected]),
    );
  }, [account, swapmeet, chainId, id, selected]);

  return (
    <PanelFooter>
      <Select
        size="sm"
        variant="filterBar"
        onChange={({ target }) => setSelected(target.value)}
        value={selected}
      >
        <option disabled>Equip to…</option>
        {data?.wallets.edges![0]?.node?.hustlers.map(({ id, title, name }) => (
          <option key={id} value={id}>
            {title} {name}
          </option>
        ))}
      </Select>
      <Button variant="primary" disabled={!selected} onClick={equip}>
        Equip
      </Button>
    </PanelFooter>
  );
};

export default GearFooter;
