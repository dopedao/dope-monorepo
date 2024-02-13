import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MAINNET_API_URL, REFETCH_INTERVAL } from 'utils/constants';

export type CurrencyData = {
  eth: number;
  usd: number;
};

export type Currencies = {
  'dope-wars-paper': CurrencyData;
  optimism: CurrencyData;
  usd: CurrencyData;
};

export const CurrencyDataContext = React.createContext<Currencies | undefined>(undefined);

// Provider to fetch and cache currency data from our api
// backed by coingecko. This data is used to display
// prices in the app.
const CurrencyExchangeProvider: React.FC = ({ children }) => {
  const { data } = useQuery<Currencies>({
    queryKey: ['currencyData'],
    queryFn: async () => {
      const response = await fetch(`${MAINNET_API_URL}/currency-prices`);
      return response.json();
    },
    refetchInterval: REFETCH_INTERVAL,
  });

  return <CurrencyDataContext.Provider value={data}>{children}</CurrencyDataContext.Provider>;
};

export default CurrencyExchangeProvider;
