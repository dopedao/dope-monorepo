import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDisconnect } from 'wagmi';

const DisconnectAndQuitButton = ({
  returnToPath = '/hustlers/mint',
}: {
  returnToPath?: string;
}) => {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleQuitButton = useCallback(() => {
    disconnect();
    router.replace(returnToPath);
  }, [disconnect, returnToPath, router]);

  return <Button onClick={handleQuitButton}>Cancel Mint</Button>;
};

export default DisconnectAndQuitButton;
