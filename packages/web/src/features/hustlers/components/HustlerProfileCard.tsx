import { Box, Heading } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Hustler } from 'generated/graphql';
import LoadingBlock from 'components/LoadingBlock';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import RenderFromChain from 'features/hustlers/components/RenderFromChain';
import { HustlerHustlerType } from 'generated/graphql';
import { NETWORK, OPT_CHAIN_ID } from 'utils/constants';

import { useBestListingPrice } from 'providers/ReservoirListingsProvider';
import HustlerOwnerFooter from 'features/profile/components/HustlerOwnerFooter';
import { AskPrice, BuyButton, SwapMeetButtonContainer } from 'features/swap-meet/components';

type Props = {
  hustler: Partial<Hustler>;
  showOwnerDetails?: boolean;
};

const HustlerProfileCard = ({ hustler, showOwnerDetails = false }: Props) => {
  const formattedType = hustler.type === HustlerHustlerType.OriginalGangsta ? 'OG' : 'Hustler';
  const hasName = hustler.name?.trim() !== '';

  const chainId = parseInt(OPT_CHAIN_ID);
  // @ts-ignore
  const contractAddress = NETWORK[chainId].contracts.hustlers;

  const { price, currency } = useBestListingPrice(
    contractAddress,
    hustler.id?.toString() ?? '',
    hustler.bestAskPriceEth ?? 0,
  );
  const isOnSale = price > 0;

  if (!hustler.svg || !hustler.id) return <LoadingBlock />;
  return (
    <PanelContainer key={hustler.id} className="dopeCard">
      <PanelTitleBarFlex>
        <Box isTruncated={true}>
          <Box display="inline" color={formattedType === 'OG' ? 'var(--new-year-red)' : ''}>
            {formattedType}
          </Box>
          #{hustler.id}
        </Box>
        <AskPrice price={price as number} currency={currency} precision={3} />
      </PanelTitleBarFlex>
      <PanelBody>
        <a
          href={`/hustlers/${hustler.id}`}
          css={css`
            width: 100%;
            display: block;
          `}
        >
          <Box borderRadius="md" overflow="hidden">
            <RenderFromChain
              data={{
                image: hustler.svg,
                name: hustler.name,
              }}
            />
          </Box>
        </a>
        <Heading as="h4" height="3em" mb="0" mt="0" p="8px">
          <Box color="var(--new-year-red)" height="1.25em" isTruncated>
            {hustler.title}
          </Box>
          {hasName && <Box isTruncated>{hustler.name}</Box>}
          {!hasName && <Box color="gray">Anon</Box>}
        </Heading>
      </PanelBody>
      {!showOwnerDetails && (
        <SwapMeetButtonContainer>
          <BuyButton
            isOnSale={isOnSale}
            chainId={chainId}
            contractAddress={contractAddress}
            tokenId={hustler.id.toString()}
            precision={3}
          />
        </SwapMeetButtonContainer>
      )}
      {showOwnerDetails && (
        <HustlerOwnerFooter
          chainId={chainId}
          contractAddress={contractAddress}
          tokenId={hustler.id}
          title={hustler.name || hustler.title || `${formattedType}#${hustler.id}`}
        />
      )}
    </PanelContainer>
  );
};

export default HustlerProfileCard;
