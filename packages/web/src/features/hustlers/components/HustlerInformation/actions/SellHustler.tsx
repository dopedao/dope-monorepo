import { Button } from '@chakra-ui/react';

export type SellHustlerTypes = {
  onClick?: () => void;
};

const SellHustler = ({ onClick } : SellHustlerTypes) => {
  return (
    <Button 
      type="button"
      variant="primary"
      loadingText="Processing..."
      w="100%"
      onClick={onClick}
    >
      Sell
    </Button>
  );
}

export default SellHustler;
