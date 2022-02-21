import { useMemo } from 'react';
import { Button, Link } from '@chakra-ui/react';
import { useStarknet, useStarknetInvoke } from '@starknet-react/core';
import { useUserRegistryContract } from 'hooks/contracts/roll-your-own';

const Lobby = () => {
  const { account } = useStarknet();
  const registry = useUserRegistryContract();

  const isRegistered = useMemo(
    () => registry?.call('get_user_info', { user_id: account! }),
    [account, registry],
  );

  const { invoke, data, loading, error } = useStarknetInvoke({
    contract: registry,
    method: 'register_user',
  });

  return (
    <div>
      Lobby
      {isRegistered ? (
        <Link href="/roll-your-own/1" passHref>
          <Button>Play</Button>
        </Link>
      ) : (
        <Button
          onClick={() =>
            invoke({
              args: { user_id: account, data: '84622096520155505419920978765481155' },
            })
          }
        >
          Join
        </Button>
      )}
    </div>
  );
};

export default Lobby;
