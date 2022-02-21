import { useStarknet, useStarknetInvoke } from '@starknet-react/core';
import { useUserRegistryContract } from 'hooks/contracts/roll-your-own';

const Lobby = () => {
  const { account } = useStarknet();
  const registry = useUserRegistryContract();
  const { invoke, data, loading, error } = useStarknetInvoke({
    contract: registry,
    method: 'register_user',
  });

  return (
    <div>
      Lobby
      <button
        onClick={() =>
          invoke({
            args: { user_id: account, data: '84622096520155505419920978765481155' },
          })
        }
      >
        join
      </button>
    </div>
  );
};

export default Lobby;
