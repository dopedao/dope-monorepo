import { ReactNode, useEffect, useState } from 'react';
import { Alert, AlertIcon, Button } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, constants } from 'ethers';
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
  const { account } = useWeb3React();
  const paper = usePaper();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account) {
      paper
        .allowance(account, address)
        .then((allowance: BigNumber) => onApprove(allowance.gte('12500000000000000000000')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, address, paper]);

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
              const txn = await paper.approve(address, constants.MaxUint256);
              await txn.wait(1);
              onApprove(true);
            } catch (error) {
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Approve $PAPER Spend'}
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default ApprovePaper;
