import { useWeb3React } from '@web3-react/core';

import { API_URI } from 'utils/constants';

export const useFetchData = <TData, TVariables>(
  query: string,
): ((variables?: TVariables) => Promise<TData>) => {
  const { chainId } = useWeb3React();

  //   Default to mainnet, contextually update if chainid is supported chain
  let url = API_URI[1]+'/query';
  if (chainId == 1 || chainId == 10 || chainId == 42 || chainId == 69) {
    url = API_URI[chainId]+'/query';
  }

  return async (variables?: TVariables) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || 'Error..';
      throw new Error(message);
    }

    return json.data;
  };
};
