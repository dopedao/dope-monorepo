import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";

const DisconnectAndQuitButton = (
  {returnToPath = '/hustlers/quick-buy'}: {returnToPath?: string}
) => {
  const { deactivate } = useWeb3React();
  const router = useRouter();
  
  const handleQuitButton = useCallback(() => {
    deactivate();
    router.replace(returnToPath);
  }, [deactivate, returnToPath, router]);

  return(
    <Button 
      onClick={handleQuitButton}>
        Cancel Mint
    </Button>
  );
}

export default DisconnectAndQuitButton;
