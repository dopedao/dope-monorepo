import { MAINNET_API_URL } from 'utils/constants';
import { useContextualChainId } from 'hooks/web3';

export const useFetchData = <TData, TVariables>(
  query: string,
): ((variables?: TVariables) => Promise<TData>) => {
  const url = `${MAINNET_API_URL}/query`;

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
      console.error(message);
      throw new Error(message);
    }

    return json.data;
  };
};
