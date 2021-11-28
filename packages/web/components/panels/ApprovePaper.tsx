import { ReactNode, useEffect, useState } from 'react';
import { Alert, AlertIcon, Button } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, constants } from 'ethers';

import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import Spinner from 'svg/Spinner';
import { usePaper } from 'hooks/contracts';

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

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      paper
        .allowance(account, address)
        .then((allowance: BigNumber) => onApprove(allowance.gte('12500000000000000000000')));
    }
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
      <PanelTitleBar>Approve $PAPER Spend</PanelTitleBar>
      <PanelBody>
        <p>{children}</p>
        <Button
          onClick={async () => {
            setLoading(true);
            try {
              const txn = await paper.approve(address, constants.MaxUint256);
              await txn.wait(1);
              onApprove(true);
            } catch (error) {
            } finally {
              setLoading(false);
            }
          }}
          disabled={isLoading}
          width="220px"
        >
          {isLoading ? <Spinner /> : 'Approve $PAPER Spend'}
        </Button>
      </PanelBody>
    </PanelContainer>
  );
};

export default ApprovePaper;
