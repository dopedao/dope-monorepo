import { DopeCardProps } from './DopeCard';
import DopeCardTitleButton from './DopeCardTitleButton';
import CartIcon from 'ui/svg/Cart';
import { BuyModal } from '@reservoir0x/reservoir-kit-ui';
import { NETWORK, ETH_CHAIN_ID } from 'utils/constants';
import { useBestListingPrice } from 'providers/ReservoirListingsProvider';

type DopeCardMarketButtonProps = Pick<DopeCardProps, 'dope'>;

const DopeCardMarketButton = ({ dope }: DopeCardMarketButtonProps) => {
  const chainId = ETH_CHAIN_ID;
  // @ts-ignore
  const contractAddress = NETWORK[chainId].contracts.dope;

  const { price, currency } = useBestListingPrice(
    contractAddress,
    dope.id?.toString() ?? '',
    dope.bestAskPriceEth ?? 0,
  );
  const isOnSale = price > 0;

  return (
    <BuyModal
      chainId={parseInt(chainId)}
      trigger={
        <DopeCardTitleButton>
          {isOnSale && `${price.toFixed(2)} Ξ`}
          {!isOnSale && <CartIcon color="white" width={20} height={20} />}
        </DopeCardTitleButton>
      }
      token={`${contractAddress}:${dope.id}`}
      defaultQuantity={1}
      onConnectWallet={() => console.log('wallet connected')}
      onPurchaseComplete={data => console.log('Purchase Complete')}
      onPurchaseError={(error, data) => console.log('Transaction Error', error, data)}
      onClose={(data, stepData, currentStep) => console.log('hidden')}
    />
  );
};
export default DopeCardMarketButton;
