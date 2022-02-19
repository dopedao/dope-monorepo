import { useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { Box, Button, Image } from '@chakra-ui/react';
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
import { ReceiptItem } from './ReceiptItem';
import ReceiptItemDope from './ReceiptItemDope';
import ReceiptItemHustler from './ReceiptItemHustler';

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
    oneclick.callStatic
      .estimate(unbundleCost.add(paperAmount))
      // Allow 5% slippage
      .then(cost => setPaperCost(cost.add(cost.div(100).mul(5))));
  }, [oneclick, unbundleCost, paperAmount]);

  const order = useMemo(() => {
    if (
      !data ||
      !data.dopes ||
      !data.dopes.edges ||
      !(data.dopes.edges.length > 0) ||
      !data.dopes.edges[0]!.node ||
      !data.dopes.edges[0]!.node.listings ||
      !(data.dopes.edges[0]!.node.listings.length > 0) ||
      !data.dopes.edges[0]!.node.listings[0]!.order
    ) {
      return;
    }

    return data.dopes.edges[0]?.node.listings[0]?.order!;
  }, [data]);

  const total = useMemo(() => {
    if (!order || !paperCost) return;
    return BigNumber.from(order.currentPrice).add(paperCost);
  }, [order, paperCost]);

  const onMintHustler = useCallback(async () => {
    if (!account || !order || !paperAmount || !paperCost || !total) {
      return;
    }

    const config = createConfig(hustlerConfig);
    const { dopeId, mintAddress } = hustlerConfig;

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
      { value: total },
    );
  }, [order, total, hustlerConfig, account, oneclick, paperCost, paperAmount]);

  return (
    <PanelContainer justifyContent="flex-start">
      <PanelTitleHeader>You Are Receiving</PanelTitleHeader>
      <PanelBody>
          <ReceiptItemDope hustlerConfig={hustlerConfig} />
          <ReceiptItemHustler hustlerConfig={hustlerConfig} />
        {/* PAPER */}
        {/* <ReceiptItem>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image
              src="/images/icon/wallet.svg" alt="Wallet"
            />
          </Box>
          <Box flex="1">
            {unbundleCost &&
              parseInt(formatEther(unbundleCost), 10).toLocaleString(undefined, {
                minimumFractionDigits: 0,
            })}
            &nbsp;
            $PAPER
          </Box>
          <Box>
            <Image
              src="/images/icon/ethereum.svg"
              width="16px"
              alt="This asset lives on Ethereum Mainnet"
            />
          </Box>
        </ReceiptItem> */}
        {/* GEAR */}
        <ReceiptItem>
          <Box display="flex" alignItems="center" justifyContent="center" background="var(--gray-100)" color="black" borderRadius="4px">9</Box>
          <Box flex="1">DOPE Gear NFTs</Box>
          <Box>
            <Image
              src="/images/icon/optimism.svg"
              width="16px"
              alt="This asset lives on Optimism"
            />
          </Box>
        </ReceiptItem>
      </PanelBody>
      <PanelFooter
        css={css`
          padding: 1em;
          position: relative;
        `}
      >
        <div></div>
        <Button variant="primary" onClick={onMintHustler} autoFocus>
          ✨ Mint Hustler ✨
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default ApprovePanelQuickBuy;
