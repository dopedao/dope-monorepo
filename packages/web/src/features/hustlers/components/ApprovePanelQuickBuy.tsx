import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { Button, Table, Tr, Td } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';
import { StepsProps } from 'features/hustlers/modules/Steps';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import { useOneClickInitiator, useInitiator } from 'hooks/contracts';
import { createConfig } from 'utils/HustlerConfig';
import { useDopeListingQuery } from 'generated/graphql';
import { formatEther, parseEther } from 'ethers/lib/utils';

const ApprovePanelQuickBuy = ({ hustlerConfig, setHustlerConfig }: StepsProps) => {
  const { account } = useWeb3React();
  const oneclick = useOneClickInitiator();
  const initiator = useInitiator();
  const [unbundleCost, setUnbundleCost] = useState<BigNumber>();
  const [paperCost, setPaperCost] = useState<BigNumber>();
  const [paperAmount, setPaperAmount] = useState<BigNumber>(BigNumber.from(0));
  const { data, isFetching } = useDopeListingQuery(
    {
      where: {
        id: hustlerConfig.dopeId,
      },
    },
    {
      enabled: !!account,
    },
  );

  useEffect(() => {
    initiator.cost().then(setUnbundleCost);
  }, [initiator]);

  useEffect(() => {
    if (!unbundleCost) return;
    oneclick.callStatic.estimate(unbundleCost.add(paperAmount)).then(setPaperCost);
  }, [oneclick, unbundleCost, paperAmount]);

  const canMint = false;
  const onMintHustler = useCallback(async () => {
    if (!account) {
      return;
    }

    const config = createConfig(hustlerConfig);

    const { dopeId, mintAddress } = hustlerConfig;

    if (
      !data ||
      !data.dopes ||
      !data.dopes.edges ||
      !(data.dopes.edges.length > 0) ||
      !data.dopes.edges[0]!.node ||
      !data.dopes.edges[0]!.node.listings ||
      !(data.dopes.edges[0]!.node.listings.length > 0) ||
      !data.dopes.edges[0]!.node.listings[0]!.order ||
      !paperAmount ||
      !paperCost
    ) {
      return;
    }

    const order = data.dopes.edges[0]?.node.listings[0]?.order!;
    const value = BigNumber.from(order.currentPrice).add(paperCost);

    oneclick.initiate(
      {
        maker: order.maker,
        vs: order.v,
        rss: [order.r, order.s],
        fee: order.makerRelayerFee,
        price: order.currentPrice,
        expiration: order.expirationTime,
        listing: order.listingTime,
        salt: order.salt,
        calldataBuy:
          order.calldata.slice(0, 32) +
          '0000000000000000000000000000000000000000' +
          order.calldata.slice(72, 98) +
          'A92C2ae3E1CAa57B254f5675E77DC38f4e336E60' +
          order.calldata.slice(138),
        calldataSell: order.calldata,
      },
      dopeId,
      config,
      mintAddress ? mintAddress : account,
      order.currentPrice,
      paperCost,
      paperAmount,
      Math.ceil(Date.now() / 1000 + 600),
      { value },
    );
  }, [data, hustlerConfig, account, oneclick, paperCost, paperAmount]);

  return (
    <PanelContainer justifyContent="flex-start">
      <PanelTitleHeader>Quick Buy Hustler</PanelTitleHeader>
      <PanelBody>
        <Table>
          <Tr>
            <Td></Td>
            <Td textAlign="right">1</Td>
            <Td>DOPE NFT #{hustlerConfig.dopeId}</Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td textAlign="right">{unbundleCost && formatEther(unbundleCost)}</Td>
            <Td>$PAPER</Td>
          </Tr>
        </Table>
      </PanelBody>
      <PanelFooter
        css={css`
          padding: 1em;
          position: relative;
        `}
      >
        <div></div>
        <Button variant="primary" onClick={onMintHustler}>
          ✨ Mint Hustler ✨
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default ApprovePanelQuickBuy;
