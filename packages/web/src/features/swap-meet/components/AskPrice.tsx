import { Box } from '@chakra-ui/layout';
import { useContext } from 'react';
import { Currencies, CurrencyData, CurrencyDataContext } from 'providers/CurrencyExchangeProvider';
import numbro from 'numbro';

type Props = {
  price?: number | null;
  // currency?: keyof Currencies | 'eth';
  currency?: string;
  precision?: number;
  color?: string;
};

// Responsible for displaying the price of an item in the app.
// Defaults to PAPER currency
export const AskPrice = ({ price, color = 'var(--gray-500)', precision = 2, ...props }: Props) => {
  const currencies = useContext(CurrencyDataContext);
  if (!price) return null;
  // console.log('PRICE FROM ASK', price);
  let formattedPrice = `${price.toFixed(precision)} Ξ`;

  if (currencies?.['dope-wars-paper']) {
    const paperData = currencies['dope-wars-paper'];
    const priceInPaper = price / paperData.eth;
    precision = 2;
    formattedPrice = numbro(priceInPaper).formatCurrency({
      average: true,
      mantissa: precision,
      currencyPosition: 'postfix',
      currencySymbol: ' $PAPER',
    });
  } else {
    console.error('No currency data returned from the provider');
  }

  return (
    <Box color={color} {...props}>
      {formattedPrice}
    </Box>
  );
};
