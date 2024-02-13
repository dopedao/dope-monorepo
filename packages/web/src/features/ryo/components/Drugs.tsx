import { Button, Table, Thead, Tbody, Tr, Th, Td, Box, useBoolean } from '@chakra-ui/react';
import { NavLink } from 'components/NavLink';
import { useDrugsQuery } from 'generated/graphql';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { buildIconSVG } from 'utils/svg-builder';
import { css } from '@emotion/react';
import { RYO_ITEM_IDS, useLocationOwnedContract } from 'hooks/contracts/roll-your-own';
import { useStarknet, useStarknetCall } from '@starknet-react/core';
import { BigNumberish, toBN } from 'starknet/dist/utils/number';
import { useRollYourOwn } from '../context';

type Drug = {
  id: string;
  name: string;
  rle: string | undefined;
};

const Drugs = () => {
  const { data } = useDrugsQuery();

  const drugs = useMemo(() => {
    if (!data?.items.edges) return [];

    return data.items.edges.reduce((result, edge) => {
      if (!edge || !edge.node) return result;

      const { node } = edge;

      return [
        ...result,
        {
          id: node.id,
          name: node?.name,
          rle: node?.rles ? node?.rles?.male : node?.base?.rles?.male,
        },
      ];
    }, [] as Drug[]);
  }, [data]);

  return (
    <Box px={3}>
      <Table size="sm" color="white">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Product</Th>
            <Th isNumeric>Cost</Th>
            <Th isNumeric>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {drugs.map(drug => (
            <DrugRow key={drug.name} drug={drug} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Drugs;

const DrugRow = ({ drug }: { drug: Drug }) => {
  const router = useRouter();
  const { roundId, locationId } = router.query;

  const drugId = RYO_ITEM_IDS[Number(drug.id)];

  const { ownedItems } = useRollYourOwn();
  const [isExpanded, setIsExpanded] = useBoolean();

  const { contract: locationOwned } = useLocationOwnedContract();
  const { data } = useStarknetCall({
    contract: locationOwned,
    method: 'check_market_state',
    args: ['1', drugId.toString()],
  });

  const [itemQuantity, moneyQuantity] = useMemo(() => {
    if (!data) return [undefined, undefined];

    const [itemQuantity, moneyQuantity]: BigNumberish[] = data;

    return [toBN(itemQuantity), toBN(moneyQuantity)];
  }, [data]);
  const cost = useMemo(() => {
    if (!itemQuantity || !moneyQuantity) return;

    return moneyQuantity.div(itemQuantity.sub(toBN(1)));
  }, [itemQuantity, moneyQuantity]);

  const userOwnedQuantity = ownedItems[drugId - 1];
  const isBuyDisabled = cost?.isZero() || itemQuantity?.isZero();
  const isSellDisalbed = userOwnedQuantity?.isZero();

  const CELL_PROPS = {
    borderBottom: isExpanded ? 'none' : 'inherit',
  };
  const background = isExpanded ? '#434345' : 'inherit';

  return (
    <>
      <Tr background={background} cursor="pointer" onClick={() => setIsExpanded.toggle()}>
        <Td {...CELL_PROPS}>
          {drug.rle && (
            <Box
              css={css`
                width: 32px;
                height: 32px;
                overflow: hidden;
              }`}
              dangerouslySetInnerHTML={{ __html: buildIconSVG([drug.rle]) }}
            />
          )}
        </Td>
        <Td {...CELL_PROPS}>{drug.name}</Td>
        <Td isNumeric {...CELL_PROPS}>
          {cost?.toString()}
        </Td>
        <Td isNumeric {...CELL_PROPS}>
          {userOwnedQuantity?.toString()}
        </Td>
      </Tr>
      {isExpanded && (
        <Tr background={background}>
          <Td colSpan={2}>
            <NavLink href={`/roll-your-own/${roundId}/location/${locationId}/buy/${drug.id}`}>
              <Button color="black" isDisabled={isBuyDisabled} w="full">
                Buy
              </Button>
            </NavLink>
          </Td>
          <Td colSpan={2}>
            <NavLink href={`/roll-your-own/${roundId}/location/${locationId}/sell/${drug.id}`}>
              <Button color="black" isDisabled={isSellDisalbed} w="full">
                Sell
              </Button>
            </NavLink>
          </Td>
        </Tr>
      )}
    </>
  );
};
