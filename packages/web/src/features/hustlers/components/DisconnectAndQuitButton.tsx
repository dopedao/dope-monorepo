import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";

const DisconnectAndQuitButton = () => {
  const { deactivate } = useWeb3React();
  const router = useRouter();
  
  const handleQuitButton = useCallback(() => {
    deactivate();
    router.replace('/hustlers/quick-buy');
  }, [deactivate, router]);

  return(
    <Button 
      onClick={handleQuitButton}>
        Disconnect &amp; Cancel
    </Button>
  );
}

export default DisconnectAndQuitButton;
