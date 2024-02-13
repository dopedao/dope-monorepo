import { ReactNode, useEffect, useState } from 'react';
import { Alert, AlertIcon, Button } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { ethers, BigNumberish } from 'ethers';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleHeader from 'components/PanelTitleHeader';
import Spinner from 'ui/svg/Spinner';
import { usePaper } from 'hooks/contracts';
import PanelFooter from 'components/PanelFooter';

const ApprovePaper = ({
  address,
  children,
  isApproved,
  onApprove,
}: {
  address: string;
  children: ReactNode;
  isApproved: boolean | undefined;
  onApprove: (isApproved: boolean) => void;
}) => {
  const { address: account } = useAccount();
  const paper = usePaper();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account) {
      paper.allowance(account, address).then((allowance: BigNumberish) => {
        const a = BigInt(allowance);
        onApprove(a >= 12500000000000000000000n);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, address, paper, onApprove]);

  if (isApproved === undefined) {
    return <Spinner />;
  }

  if (isApproved) {
    return (
      <Alert status="success">
        <AlertIcon />
        $PAPER Spend Approved
      </Alert>
    );
  }

  return (
    <PanelContainer>
      <PanelTitleHeader>Approve $PAPER Spend</PanelTitleHeader>
      <PanelBody>
        <p>{children}</p>
      </PanelBody>
      <PanelFooter stacked>
        <Button
          onClick={async () => {
            setIsLoading(true);
            try {
              await paper.approve(address, ethers.MaxUint256);
              onApprove(true);
            } catch (error) {
            } finally {
              setIsLoading(false);
            }
          }}
          isDisabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Approve $PAPER Spend'}
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default ApprovePaper;
